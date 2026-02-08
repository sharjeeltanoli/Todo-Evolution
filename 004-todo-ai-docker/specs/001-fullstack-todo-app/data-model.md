# Data Model: Full-stack Todo Application

This document defines the data models for the application, based on the entities identified in the feature specification.

## User Model

Represents an authenticated user in the system.

-   **`id`**: `integer` (Primary Key, Auto-increment)
-   **`email`**: `string` (Unique, Not Null)
-   **`password`**: `string` (Hashed, Not Null)
-   **`created_at`**: `datetime`
-   **`updated_at`**: `datetime`

## Task Model

Represents a single todo item, linked to a specific user.

-   **`id`**: `integer` (Primary Key, Auto-increment)
-   **`user_id`**: `integer` (Foreign Key to `User.id`, Not Null, Indexed)
-   **`title`**: `string` (Not Null, Max length: 200)
-   **`description`**: `string` (Nullable, Max length: 1000)
-   **`completed`**: `boolean` (Default: `false`)
-   **`created_at`**: `datetime`
-   **`updated_at`**: `datetime`

## Relationships

-   A **User** can have many **Tasks**.
-   A **Task** belongs to one and only one **User**.
