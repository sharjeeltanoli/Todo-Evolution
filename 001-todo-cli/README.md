# Todo Evolution

This is a simple, in-memory command-line interface (CLI) for managing a to-do list. The application is built with Python and follows a modular structure to separate concerns.

## Features

*   Add new tasks with a title and description.
*   View all existing tasks.
*   Update the title or description of a task.
*   Toggle the completion status of a task.
*   Delete a task.

## Getting Started

To run the application, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/todo-evolution.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd todo-evolution
    ```
3.  **Run the application:**
    ```bash
    python -m src.main
    ```

## Available Commands

The application supports the following commands:

*   `add`: Add a new task.
*   `view`: View all tasks.
*   `update`: Update an existing task.
*   `toggle`: Toggle the completion status of a task.
*   `delete`: Delete a task.
*   `exit` or `quit`: Exit the application.

## Project Structure

The project is organized into the following directories:

*   `src/`: Contains the main source code for the application.
    *   `cli/`: Handles command-line input, parsing, and routing.
    *   `models/`: Defines the data structures for the application (e.g., the `Task` model).
    *   `services/`: Implements the business logic for managing tasks.
    *   `utils/`: Provides utility functions, such as input validation.
*   `tests/`: Contains the tests for the application.
*   `specs/`: Contains the specifications and documentation for the project.
*   `history/`: Contains the history of prompts and commands used in the project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
