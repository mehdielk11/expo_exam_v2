import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Task } from '../types/task';
import {
  initDB,
  getAllTasks,
  insertTask,
  deleteTask,
  toggleTaskStatus,
} from '../database/sqlite';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTasks();
      setTasks(data);
    } catch (e) {
      setError('Failed to load tasks.');
      Alert.alert('Database Error', 'Could not load tasks from database.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await loadTasks();
      } catch (e) {
        setError('Failed to initialize database.');
        setLoading(false);
      }
    })();
  }, [loadTasks]);

  const addTask = useCallback(
    async (title: string, description: string, status: 0 | 1) => {
      try {
        await insertTask(title, description, status);
        await loadTasks();
      } catch (e) {
        Alert.alert('Database Error', 'Could not save task. Please try again.');
        throw e;
      }
    },
    [loadTasks]
  );

  const removeTask = useCallback(
    async (id: number) => {
      try {
        await deleteTask(id);
        await loadTasks();
      } catch (e) {
        Alert.alert('Database Error', 'Could not delete task. Please try again.');
      }
    },
    [loadTasks]
  );

  const toggleStatus = useCallback(
    async (id: number, currentStatus: 0 | 1) => {
      try {
        await toggleTaskStatus(id, currentStatus);
        await loadTasks();
      } catch (e) {
        Alert.alert('Database Error', 'Could not update task status.');
      }
    },
    [loadTasks]
  );

  return { tasks, loading, error, addTask, removeTask, toggleStatus, loadTasks };
}
