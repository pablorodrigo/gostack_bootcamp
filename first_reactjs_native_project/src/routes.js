import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// pages
import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#7159c1' }, headerTintColor: '#ffffff' }}>
      <Stack.Screen name="Main" component={Main} options={{ title: 'Users' }} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}
