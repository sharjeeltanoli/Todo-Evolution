import os
from typing import List, Optional
from openai import OpenAI
from sqlmodel import Session, select
from db import engine
from models import Message, Conversation
from mcp_server.tools import add_task, list_tasks, complete_task, delete_task, update_task
import json

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    print("Warning: OPENAI_API_KEY not found in environment variables.")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key or "dummy-key-to-prevent-init-crash"
)

SYSTEM_PROMPT = """
You are a helpful task management assistant. 
You can help users manage their todo list by creating, listing, updating, and deleting tasks.
Always be polite and concise.
"""

def chat_orchestrator(user_id: int, conversation_id: int, user_message: str):
    if not api_key:
        return "System Error: Server configuration is missing API credentials. Please contact the administrator."
    with Session(engine) as session:
        # 1. Save User Message
        db_user_msg = Message(
            conversation_id=conversation_id,
            user_id=user_id,
            role="user",
            content=user_message
        )
        session.add(db_user_msg)
        session.commit()

        # 2. Load History
        history = session.exec(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at)
        ).all()

        openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in history:
            openai_messages.append({"role": msg.role, "content": msg.content})

        # 3. Define Tools for OpenAI
        tools = [
            {
                "type": "function",
                "function": {
                    "name": "add_task",
                    "description": "Add a new task",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "description": {"type": "string"},
                        },
                        "required": ["title"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "list_tasks",
                    "description": "List all tasks",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "status": {"type": "string", "enum": ["pending", "completed"]},
                        },
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "complete_task",
                    "description": "Mark a task as completed",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "task_id": {"type": "integer"},
                        },
                        "required": ["task_id"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "delete_task",
                    "description": "Delete a task",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "task_id": {"type": "integer"},
                        },
                        "required": ["task_id"],
                    },
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "update_task",
                    "description": "Update an existing task",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "task_id": {"type": "integer"},
                            "title": {"type": "string"},
                            "description": {"type": "string"},
                        },
                        "required": ["task_id"],
                    },
                },
            }
        ]

        # 4. First OpenAI Call
        try:
            response = client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages=openai_messages,
                tools=tools,
                tool_choice="auto",
            )
        except Exception as e:
            print(f"OpenAI Error: {e}")
            return "I'm sorry, I encountered an error while processing your request. Please try again later."

        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls

        # 5. Handle Tool Calls
        if tool_calls:
            openai_messages.append(response_message)
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)
                
                # Injection of user_id (T016)
                function_args["user_id"] = user_id
                
                print(f"Executing tool: {function_name} with args: {function_args}")
                
                if function_name == "add_task":
                    result = add_task(**function_args)
                elif function_name == "list_tasks":
                    result = list_tasks(**function_args)
                elif function_name == "complete_task":
                    result = complete_task(**function_args)
                elif function_name == "delete_task":
                    result = delete_task(**function_args)
                elif function_name == "update_task":
                    result = update_task(**function_args)
                else:
                    result = {"error": "Unknown function"}

                openai_messages.append(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": json.dumps(result),
                    }
                )
            
            # Second call to get the final response
            second_response = client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages=openai_messages,
            )
            final_content = second_response.choices[0].message.content
        else:
            final_content = response_message.content

        # 6. Save Assistant Response
        db_assistant_msg = Message(
            conversation_id=conversation_id,
            user_id=user_id,
            role="assistant",
            content=final_content
        )
        session.add(db_assistant_msg)
        session.commit()

        return final_content
