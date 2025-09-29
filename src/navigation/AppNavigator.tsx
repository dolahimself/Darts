import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Ionicons,
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabParamList, RootStackParamList } from '../types';

import { ChatDetailScreen } from '../screens/ChatDetailScreen';
import { ChatsScreen } from '../screens/ChatsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

interface TabBarIconProps {
  focused: boolean;
  icon: IoniconsIconName | string;
  label: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon, label }) => (
  <View style={styles.tabBarIcon}>
    <Ionicons
      name={icon as IoniconsIconName}
      size={24}
      color={focused ? '#FF4458' : '#666'}
      style={styles.iconStyle}
    />
  </View>
);

// Bottom Tab Navigator
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarItemStyle: { paddingVertical: 4 },
        tabBarActiveTintColor: '#FF4458',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          textAlign: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="home" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="chatbubbles" label="Chats" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="person" label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="ChatDetail"
          component={ChatDetailScreen}
          options={{
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 8,
    height: 70,
  },
  tabBarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginBottom: 2,
  },
  tabBarLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
});
