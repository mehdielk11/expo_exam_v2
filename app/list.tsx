import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';
import { Task } from '../types/task';

export default function ListScreen() {
  const { tasks, loading, removeTask, toggleStatus } = useTasks();
  const router = useRouter();

  if (loading) {
    return <Loading message="Loading your tasks..." />;
  }

  const pending = tasks.filter((t) => t.status === 0).length;
  const completed = tasks.filter((t) => t.status === 1).length;

  const ListHeader = () => (
    <View>
      {/* Summary strip */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#2563EB' }]}>{tasks.length}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#D97706' }]}>{pending}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: '#059669' }]}>{completed}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>All Tasks</Text>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.empty}>
      <Ionicons name="clipboard-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No tasks yet</Text>
      <Text style={styles.emptySub}>Tap the button below to add your first task.</Text>
      <TouchableOpacity
        style={styles.emptyBtn}
        onPress={() => router.push('/add')}
        activeOpacity={0.85}
        accessibilityLabel="Add your first task"
      >
        <Ionicons name="add" size={18} color="#FFFFFF" />
        <Text style={styles.emptyBtnText}>Add First Task</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onDelete={removeTask}
            onToggle={toggleStatus}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F5' },
  listContent: { paddingBottom: 24 },
  emptyContainer: { flexGrow: 1 },

  summary: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E5E7EB',
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginHorizontal: 20,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    gap: 12,
    paddingBottom: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
  },
  emptySub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
    minHeight: 48,
  },
  emptyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
