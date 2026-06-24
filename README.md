# Daily Tasks & Ideas

A React Native & Expo mobile application designed for capture, storage, and retrieval of task items and daily quotes.

## Tech Stack
- **Framework**: React Native with Expo (Expo Router)
- **Database**: local SQLite database
- **Navigation**: File-based router with bottom tabs navigation
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: React Native StyleSheet

## Design System & Theme
The application utilizes a clean, minimal cream and white user interface design:
- **Base Background**: Soft Cream (`#FAF9F5`)
- **Containers/Cards**: Clean White (`#FFFFFF`)
- **Typography & Icons**: Neutral Charcoal (`#111827`) and Gray (`#6B7280`)
- **Status Indicators**: Dynamic colors for pending (Amber `#D97706`) and completed (Green `#059669`) states.

## Key Features
- **Intuitive Home Dashboard**: Quick action navigation buttons mapping to primary application routes.
- **Form Validation & Capture**: Add new tasks with title length constraints and input validation.
- **Interactive Edit Modal**: Click on any task card within the "My Tasks" list screen to open a context modal allowing you to:
  - Edit the task title and description.
  - Quick toggle the completion status.
  - Delete the task permanently.
- **Offline Data Storage**: Local SQLite database queries keeping data strictly on your device.
- **Daily Inspiration Feed**: Direct REST API integration retrieving quotes.

## SQLite CRUD Specifications
The database handles state using the following queries:
- **CREATE**: `INSERT INTO tasks (title, description, status, createdAt) VALUES (?, ?, ?, ?);`
- **READ**: `SELECT * FROM tasks ORDER BY createdAt DESC;`
- **UPDATE**:
  - `UPDATE tasks SET status = ? WHERE id = ?;`
  - `UPDATE tasks SET title = ?, description = ? WHERE id = ?;`
- **DELETE**: `DELETE FROM tasks WHERE id = ?;`
