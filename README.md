# Daily Tasks & Ideas 📝💡

A premium, minimalist React Native and Expo mobile application designed for local task management and daily cooking/work inspiration. Built with a clean **Cream & White** aesthetic, this app operates entirely **offline-first** using a localized SQLite database.

---

## 🚀 Key Features

*   **Intuitive Home Dashboard**: Quick action navigation buttons mapping to primary application routes with micro-interaction hover states.
*   **Offline-First CRUD Storage**: Full task lifecycle management powered locally by `expo-sqlite`, ensuring complete data privacy and zero load times.
*   **Interactive Context Modals**: Click on any task card within the **My Tasks** collection screen to trigger an interactive context sheet allowing you to edit the task details, toggle completion status, or perform deletions.
*   **Daily Inspiration Feed**: Direct REST API integration retrieving random quotes and cooking tips dynamically from a remote JSON service.
*   **Minimalist Cream & White Theme**: Harmonious, eye-pleasing off-white backgrounds (`#FAF9F5`) and solid white cards (`#FFFFFF`) accented with subtle charcoal (`#111827`) details.

---

## 🛠️ Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo (SDK 51)](https://expo.dev/)
*   **Routing & Navigation**: File-based navigation via `expo-router`
*   **Database**: Local SQLite storage via `expo-sqlite`
*   **Programming Language**: TypeScript
*   **Icons**: [Ionicons](https://ionic.io/ionicons) via `@expo/vector-icons`
*   **Platform Support**: iOS & Android (Universal Dev workflow)

---

## 📦 Installation & Setup

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

*   Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).
*   Install the **Expo Go** app on your iOS or Android device to test live, or configure an emulator.

### 1. Clone & Navigate
```bash
git clone <your-repo-url>
cd expo_exam_v2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```
*   Press **`a`** to open in an Android Emulator.
*   Press **`i`** to open in the iOS Simulator.
*   Scan the QR code printed in the terminal using the camera app (iOS) or the Expo Go app (Android) to run it directly on a physical device.
*   To expose the local development server over the internet (useful for remote testing/tunnels):
    ```bash
    npx expo start --tunnel
    ```

---

## 📂 Project Architecture

```text
├── app/                  # Expo-Router filesystem-based pages
│   ├── _layout.tsx       # Root layout defining the Tab Navigation
│   ├── index.tsx         # Home dashboard screen
│   ├── add.tsx           # Add New Task screen
│   ├── list.tsx          # My Tasks list screen & context edit modal
│   └── inspiration.tsx   # Daily Quotes fetch screen
├── components/           # Reusable UI components
│   ├── TaskCard.tsx      # Interactive card representing individual task items
│   └── Loading.tsx       # Standardized loading indicator spinner
├── database/             # SQLite connection & schema helpers
│   └── sqlite.ts         # Base database adapter & SQL queries
├── hooks/                # Custom React Hooks
│   └── useTasks.ts       # Database CRUD state lifecycle hook
├── types/                # TypeScript model interfaces
│   └── task.ts           # Core task specifications
├── assets/               # App media (icons, logo, splash screen)
├── tsconfig.json         # TypeScript configuration
└── metro.config.js       # Metro bundler custom configuration
```

---

## 💾 SQLite Database Specifications

Data is persisted on-device in a SQLite file (`tasks.db`). 

### Database Schema
```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL
);
```

### Supported Queries
*   **CREATE**: `INSERT INTO tasks (title, description, status, createdAt) VALUES (?, ?, ?, ?);`
*   **READ**: `SELECT * FROM tasks ORDER BY createdAt DESC;`
*   **UPDATE**:
    *   *Status toggle*: `UPDATE tasks SET status = ? WHERE id = ?;`
    *   *Edit details*: `UPDATE tasks SET title = ?, description = ? WHERE id = ?;`
*   **DELETE**: `DELETE FROM tasks WHERE id = ?;`
