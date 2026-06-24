import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';
import { Task } from '../types/task';

export default function ListScreen() {
  const { tasks, loading, removeTask, toggleStatus, editTask, loadTasks } = useTasks();
  const router = useRouter();

  // Modal State
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [loadTasks])
  );

  if (loading) {
    return <Loading message="Loading your tasks..." />;
  }

  const pending = tasks.filter((t) => t.status === 0).length;
  const completed = tasks.filter((t) => t.status === 1).length;

  const handleOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setModalVisible(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedTask) return;
    const trimmedTitle = editTitle.trim();
    const trimmedDesc = editDesc.trim();

    if (!trimmedTitle) {
      Alert.alert('Validation Error', 'Title is required.');
      return;
    }
    if (!trimmedDesc) {
      Alert.alert('Validation Error', 'Description is required.');
      return;
    }

    try {
      await editTask(selectedTask.id, trimmedTitle, trimmedDesc);
      setModalVisible(false);
      setSelectedTask(null);
    } catch {
      // Error already handled
    }
  };

  const handleToggleFromModal = async () => {
    if (!selectedTask) return;
    try {
      await toggleStatus(selectedTask.id, selectedTask.status as 0 | 1);
      setModalVisible(false);
      setSelectedTask(null);
    } catch {}
  };

  const handleDeleteFromModal = async () => {
    if (!selectedTask) return;
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await removeTask(selectedTask.id);
            setModalVisible(false);
            setSelectedTask(null);
          } catch {}
        },
      },
    ]);
  };

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
            onPress={() => handleOpenEdit(item)}
          />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Edit Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScroll} keyboardShouldPersistTaps="handled">
              {/* Title input */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  value={editTitle}
                  onChangeText={setEditTitle}
                  placeholder="Task title"
                  maxLength={80}
                />
              </View>

              {/* Description input */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={editDesc}
                  onChangeText={setEditDesc}
                  placeholder="Task description"
                  multiline
                  numberOfLines={4}
                  maxLength={300}
                  textAlignVertical="top"
                />
              </View>

              {/* Modal Actions */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={handleSaveChanges}
                  activeOpacity={0.85}
                >
                  <Ionicons name="save-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>

                <View style={styles.secondaryActions}>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      selectedTask?.status === 1 ? styles.toggleBtnCompleted : styles.toggleBtnPending,
                    ]}
                    onPress={handleToggleFromModal}
                    activeOpacity={0.75}
                  >
                    <Ionicons
                      name={selectedTask?.status === 1 ? 'refresh-circle-outline' : 'checkmark-circle-outline'}
                      size={18}
                      color={selectedTask?.status === 1 ? '#6B7280' : '#059669'}
                    />
                    <Text
                      style={[
                        styles.actionText,
                        selectedTask?.status === 1 ? styles.actionTextGray : styles.actionTextSuccess,
                      ]}
                    >
                      {selectedTask?.status === 1 ? 'Mark Pending' : 'Mark Done'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, styles.deleteBtn]}
                    onPress={handleDeleteFromModal}
                    activeOpacity={0.75}
                  >
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                    <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  modalScroll: {
    paddingBottom: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FAF9F5',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  modalActions: {
    gap: 12,
    marginTop: 8,
  },
  saveBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    minHeight: 50,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    minHeight: 46,
  },
  toggleBtnPending: {
    backgroundColor: '#E6F4EA',
  },
  toggleBtnCompleted: {
    backgroundColor: '#F3F4F6',
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionTextSuccess: {
    color: '#059669',
  },
  actionTextGray: {
    color: '#6B7280',
  },
  actionTextDanger: {
    color: '#EF4444',
  },
});
