import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NavButtonProps {
  label: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  onPress: () => void;
}

function NavButton({ label, subtitle, icon, color, onPress }: NavButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.navBtn, { borderLeftColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
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

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={[]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Ionicons name="checkmark-done-circle" size={52} color="#111827" />
          </View>
          <Text style={styles.appTitle}>Daily Tasks & Ideas</Text>
          <Text style={styles.appSub}>
            Organize your day, capture your ideas, and stay inspired — all in one place.
          </Text>
        </View>

        {/* Stats strip */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="flash" size={20} color="#111827" />
            <Text style={styles.statLabel}>Fast</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Ionicons name="lock-closed" size={20} color="#111827" />
            <Text style={styles.statLabel}>Offline</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Ionicons name="infinite" size={20} color="#111827" />
            <Text style={styles.statLabel}>Unlimited</Text>
          </View>
        </View>

        {/* Navigation buttons */}
        <Text style={styles.sectionTitle}>Get Started</Text>
        <NavButton
          label="Add a Task"
          subtitle="Create a new task or idea"
          icon="add-circle"
          color="#4F46E5"
          onPress={() => router.push('/add')}
        />
        <NavButton
          label="My Tasks"
          subtitle="View, complete, or delete tasks"
          icon="list"
          color="#10B981"
          onPress={() => router.push('/list')}
        />
        <NavButton
          label="Get Inspired"
          subtitle="Fetch a daily quote or tip"
          icon="bulb"
          color="#F59E0B"
          onPress={() => router.push('/inspiration')}
        />


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF9F5' },
  scrollView: { backgroundColor: '#FAF9F5' },
  scroll: { paddingBottom: 32 },

  hero: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 28,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FAF9F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  appSub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 24,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#374151' },
  divider: { width: 1, height: 28, backgroundColor: '#E5E7EB' },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginHorizontal: 20,
  },

  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 68,
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
