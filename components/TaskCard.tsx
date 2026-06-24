import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number, status: 0 | 1) => void;
  onPress: () => void;
}

export default function TaskCard({ task, onDelete, onToggle, onPress }: TaskCardProps) {
  const isCompleted = task.status === 1;
  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <View style={[styles.card, isCompleted && styles.cardCompleted]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.cardContent}>
        <View style={styles.header}>
          <View style={[styles.badge, isCompleted ? styles.badgeDone : styles.badgePending]}>
            <Text style={[styles.badgeText, isCompleted ? styles.badgeTextDone : styles.badgeTextPending]}>
              {isCompleted ? 'Completed' : 'Pending'}
            </Text>
          </View>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>

        <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, isCompleted ? styles.toggleBtnCompleted : styles.toggleBtnPending]}
          onPress={() => onToggle(task.id, task.status as 0 | 1)}
          activeOpacity={0.75}
          accessibilityLabel={isCompleted ? 'Mark as pending' : 'Mark as completed'}
        >
          <Ionicons
            name={isCompleted ? 'refresh-circle-outline' : 'checkmark-circle-outline'}
            size={18}
            color={isCompleted ? '#6B7280' : '#10B981'}
          />
          <Text style={[styles.actionText, isCompleted ? styles.actionTextGray : styles.actionTextSuccess]}>
            {isCompleted ? 'Mark Pending' : 'Mark Done'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => onDelete(task.id)}
          activeOpacity={0.75}
          accessibilityLabel="Delete task"
        >
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
          <Text style={[styles.actionText, styles.actionTextDanger]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  cardContent: {
    width: '100%',
  },
  cardCompleted: {
    borderLeftColor: '#10B981',
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
  },
  badgeDone: {
    backgroundColor: '#D1FAE5',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  badgeTextPending: {
    color: '#D97706',
  },
  badgeTextDone: {
    color: '#059669',
  },
  date: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    minHeight: 34,
  },
  toggleBtnPending: {
    backgroundColor: '#E6F4EA',
  },
  toggleBtnCompleted: {
    backgroundColor: '#F3F4F6',
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    marginLeft: 'auto',
  },
  actionText: {
    fontSize: 13,
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
