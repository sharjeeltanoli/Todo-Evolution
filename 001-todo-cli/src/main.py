from src.cli.router import CommandRouter
from src.cli.parser import parse_input
from src.context import Context # Import Context

def main():
    print("Todo CLI (In-Memory)")
    print("Type 'exit' or 'quit' to end the application.")

    context = Context() # Initialize Context
    router = CommandRouter(context) # Pass context to router

    while True:
        user_input = input("> ")
        command, args = parse_input(user_input)

        if command in ["exit", "quit"]:
            print("Exiting application. Goodbye!")
            break
        else:
            router.route_command(command, args) # Pass command and args separately

if __name__ == "__main__":
    main()
