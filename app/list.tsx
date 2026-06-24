import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';
import { Task } from '../types/task';

export default function ListScreen() {
  const { tasks, loading, removeTask, toggleStatus } = useTasks();

  if (loading) {
    return <Loading message="Loading your tasks..." />;
  }

  const EmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>No tasks yet</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard task={item} onDelete={removeTask} onToggle={toggleStatus} />
        )}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F5' },
  listContent: { paddingBottom: 24 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#374151' },
});
