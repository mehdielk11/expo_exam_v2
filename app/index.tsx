import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavButtonProps {
  label: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  onPress: () => void;
}

export function NavButton({ label, subtitle, icon, color, onPress }: NavButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.navBtn, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.iconWrap, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon} size={26} color={color} />
      </View>
      <View style={styles.navBtnText}>
        <Text style={styles.navBtnLabel}>{label}</Text>
        <Text style={styles.navBtnSub}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  navBtnText: { flex: 1 },
  navBtnLabel: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 2 },
  navBtnSub: { fontSize: 12, color: '#6B7280' },
});
