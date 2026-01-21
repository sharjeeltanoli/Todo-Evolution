# Data Model: AI-Powered Task Chatbot

## Entities

### Conversation
Represents a chat session between a user and the AI assistant.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | Integer (PK) | Yes | Auto-incrementing unique identifier. |
| `user_id` | String (FK) | Yes | References `User.id`. Indexed for fast retrieval. |
| `created_at` | Timestamp | Yes | UTC timestamp of creation. |
| `updated_at` | Timestamp | Yes | UTC timestamp of last activity. |

### Message
Represents a single message within a conversation.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | Integer (PK) | Yes | Auto-incrementing unique identifier. |
| `conversation_id` | Integer (FK) | Yes | References `Conversation.id`. Indexed. |
| `user_id` | String (FK) | Yes | References `User.id`. Indexed for security filtering. |
| `role` | String | Yes | One of: "user", "assistant", "system", "tool". |
| `content` | Text | Yes | The content of the message. |
| `created_at` | Timestamp | Yes | UTC timestamp of creation. |

## Relationships

-   **User** (1) -> (Many) **Conversation**
-   **User** (1) -> (Many) **Message**
-   **Conversation** (1) -> (Many) **Message**
    -   *Constraint*: `ON DELETE CASCADE` (Deleting a conversation deletes all its messages).

## SQLModel Definitions

```python
class Conversation(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Message(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversation.id", index=True)
    user_id: str = Field(foreign_key="user.id", index=True)
    role: str = Field()  # "user", "assistant"
    content: str = Field()
    created_at: datetime = Field(default_factory=datetime.utcnow)
```
