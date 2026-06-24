import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../hooks/useTasks';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { addTask } = useTasks();

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (!trimmedTitle) {
      Alert.alert('Validation Error', 'Title is required. Please enter a title.');
      return;
    }
    if (!trimmedDesc) {
      Alert.alert('Validation Error', 'Description is required. Please enter a description.');
      return;
    }

    setSubmitting(true);
    try {
      await addTask(trimmedTitle, trimmedDesc, isCompleted ? 1 : 0);
      Alert.alert('Success', 'Task saved successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setTitle('');
            setDescription('');
            setIsCompleted(false);
          },
        },
      ]);
    } catch {
      // Error already shown via Alert inside addTask
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setIsCompleted(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Header card */}
          <View style={styles.headerCard}>
            <Ionicons name="create" size={28} color="#111827" />
            <Text style={styles.headerTitle}>New Task</Text>
            <Text style={styles.headerSub}>Fill in the details below to add a new task or idea.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Title */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Title <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Buy groceries"
                placeholderTextColor="#9CA3AF"
                value={title}
                onChangeText={setTitle}
                maxLength={80}
                returnKeyType="next"
                accessibilityLabel="Task title"
              />
              <Text style={styles.charCount}>{title.length}/80</Text>
            </View>

            {/* Description */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Description <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your task or idea..."
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                maxLength={300}
                textAlignVertical="top"
                accessibilityLabel="Task description"
              />
              <Text style={styles.charCount}>{description.length}/300</Text>
            </View>

            {/* Status switch */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Status <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.switchRow}>
                <View style={styles.switchInfo}>
                  <View style={[styles.dot, isCompleted ? styles.dotCompleted : styles.dotPending]} />
                  <Text style={[styles.switchLabel, { color: isCompleted ? '#059669' : '#D97706' }]}>
                    {isCompleted ? 'Completed' : 'Pending'}
                  </Text>
                </View>
                <Switch
                  value={isCompleted}
                  onValueChange={setIsCompleted}
                  trackColor={{ false: '#FEF3C7', true: '#D1FAE5' }}
                  thumbColor={isCompleted ? '#10B981' : '#D97706'}
                  ios_backgroundColor="#E5E7EB"
                  accessibilityLabel="Task status toggle"
                />
              </View>
            </View>

            {/* Actions */}
            <TouchableOpacity
              style={[styles.saveBtn, submitting && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={submitting}
              activeOpacity={0.85}
              accessibilityLabel="Save task"
            >
              <Ionicons name="save-outline" size={20} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>
                {submitting ? 'Saving...' : 'Save Task'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetBtn}
              onPress={handleReset}
              activeOpacity={0.75}
              accessibilityLabel="Reset form"
            >
              <Ionicons name="refresh-outline" size={18} color="#6B7280" />
              <Text style={styles.resetBtnText}>Reset Form</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F5' },
  scroll: { paddingBottom: 32 },

  headerCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  headerSub: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },

  form: {
    padding: 20,
    gap: 4,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#FFFFFF',
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
  charCount: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 52,
  },
  switchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotPending: { backgroundColor: '#D97706' },
  dotCompleted: { backgroundColor: '#059669' },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  saveBtn: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    minHeight: 52,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  saveBtnDisabled: {
    opacity: 0.6,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  resetBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    marginTop: 4,
    minHeight: 44,
  },
  resetBtnText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});
