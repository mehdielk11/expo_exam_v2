import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: IoniconsName;
  iconFocused: IoniconsName;
}

const TABS: TabConfig[] = [
  { name: 'index', title: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'add', title: 'Add Task', icon: 'add-circle-outline', iconFocused: 'add-circle' },
  { name: 'list', title: 'My Tasks', icon: 'list-outline', iconFocused: 'list' },
  { name: 'inspiration', title: 'Inspire', icon: 'bulb-outline', iconFocused: 'bulb' },
];

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#111827',
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          tabBarActiveTintColor: '#111827',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            height: 80,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        {TABS.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? tab.iconFocused : tab.icon}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </SafeAreaProvider>
  );
}
