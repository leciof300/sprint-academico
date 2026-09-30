import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './src/theme/colors';

import DashboardScreen from './src/screens/DashboardScreen';
import BacklogScreen from './src/screens/BacklogScreen';
import SprintScreen from './src/screens/SprintScreen';
import TimerScreen from './src/screens/TimerScreen';
import CalendarScreen from './src/screens/CalendarScreen'; // <-- Importando o calendário

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textBody,
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.textTitle, fontWeight: 'bold' },
          headerTitleAlign: 'center',
          tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
          tabBarLabelStyle: { fontSize: 10 } // Fonte um pouco menor para caber os 5 itens
        }}
      >
        <Tab.Screen name="Visão Geral" component={DashboardScreen} />
        <Tab.Screen name="Agenda" component={CalendarScreen} />
        <Tab.Screen name="Backlog" component={BacklogScreen} />
        <Tab.Screen name="Sprint" component={SprintScreen} />
        <Tab.Screen name="Foco" component={TimerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}