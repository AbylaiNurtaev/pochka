import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useLanguage } from '../contexts/LanguageContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { language } = useLanguage();

  const getTabLabel = (key: string) => {
    switch (key) {
      case 'home':
        return language === 'kz' ? 'Басты' : language === 'en' ? 'Home' : 'Главная';
      case 'statistics':
        return language === 'kz' ? 'Статистика' : language === 'en' ? 'Statistics' : 'Статистика';
      case 'analytics':
        return language === 'kz' ? 'Аналитика' : language === 'en' ? 'Analytics' : 'Аналитика';
      case 'profile':
        return language === 'kz' ? 'Профиль' : language === 'en' ? 'Profile' : 'Профиль';
      default:
        return '';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#27343a',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: getTabLabel('home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarLabel: getTabLabel('statistics'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="stats-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: getTabLabel('analytics'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="analytics" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: getTabLabel('profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


