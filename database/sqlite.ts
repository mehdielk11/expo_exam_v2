import * as SQLite from 'expo-sqlite';
import { Task } from '../types/task';

// Lazy async singleton — avoids the module-level openDatabaseSync call that
// crashes on web because SharedArrayBuffer is not available without COOP/COEP headers.
let _db: SQLite.SQLiteDatabase | null = null;

async function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (!_db) {
    _db = await SQLite.openDatabaseAsync('tasks.db');
  }
  return _db;
}

export async function initDB(): Promise<void> {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);
}

export async function insertTask(
  title: string,
  description: string,
  status: 0 | 1
): Promise<void> {
  const db = await getDB();
  const createdAt = new Date().toISOString();
  await db.runAsync(
    'INSERT INTO tasks (title, description, status, createdAt) VALUES (?, ?, ?, ?);',
    [title, description, status, createdAt]
  );
}

export async function getAllTasks(): Promise<Task[]> {
  const db = await getDB();
  const rows = await db.getAllAsync<Task>(
    'SELECT * FROM tasks ORDER BY createdAt DESC;'
  );
  return rows;
}

export async function deleteTask(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync('DELETE FROM tasks WHERE id = ?;', [id]);
}

export async function toggleTaskStatus(
  id: number,
  currentStatus: 0 | 1
): Promise<void> {
  const db = await getDB();
  const newStatus = currentStatus === 0 ? 1 : 0;
  await db.runAsync('UPDATE tasks SET status = ? WHERE id = ?;', [newStatus, id]);
}

export async function updateTask(
  id: number,
  title: string,
  description: string
): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    'UPDATE tasks SET title = ?, description = ? WHERE id = ?;',
    [title, description, id]
  );
}
