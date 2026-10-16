import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import FeedScreen from './screens/FeedScreen';
import UploadScreen from './screens/UploadScreen';
import LibraryScreen from './screens/LibraryScreen';
import { THEME } from './theme';

const Tab = createBottomTabNavigator();

const TAB_CONFIG = {
  Feed: { icon: '📖', label: 'Feed' },
  Upload: { icon: '⬆️', label: 'Upload' },
  Library: { icon: '📚', label: 'Library' },
};

function VarsityTabIcon({ name, focused }) {
  const item = TAB_CONFIG[name] || { icon: '•', label: name };

  return (
    <View style={[styles.tabItemWrapper, focused && styles.tabItemActive]}>
      <Text style={[styles.tabIconText, focused && styles.tabIconTextActive]}>
        {item.icon}
      </Text>
      {focused && <View style={styles.blueActivePip} />}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={THEME.surface} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: THEME.surface,
            borderTopColor: THEME.border,
            borderTopWidth: 1,
            height: 68,
            paddingBottom: 10,
            paddingTop: 8,
            elevation: 8,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: -2 },
          },
          tabBarActiveTintColor: THEME.blue,
          tabBarInactiveTintColor: THEME.textMuted,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.2,
          },
          tabBarIcon: ({ focused }) => (
            <VarsityTabIcon name={route.name} focused={focused} />
          ),
        })}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{ tabBarLabel: 'Feed' }}
        />
        <Tab.Screen
          name="Upload"
          component={UploadScreen}
          options={{ tabBarLabel: 'Upload' }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ tabBarLabel: 'Library' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabItemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: THEME.radiusPill,
  },
  tabItemActive: {
    backgroundColor: THEME.blueSoft,
  },
  tabIconText: {
    fontSize: 20,
    opacity: 0.65,
  },
  tabIconTextActive: {
    fontSize: 22,
    opacity: 1,
  },
  blueActivePip: {
    position: 'absolute',
    top: 2,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.blue,
  },
});
