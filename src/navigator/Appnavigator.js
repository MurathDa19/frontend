import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext'; // ← aquí obtienes userToken
import { LoginScreen } from '../screens/LoginScreen';
import { TasksScreen } from '../screens/TasksScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext); // ← aquí se define

  if (isLoading) return null; // o un SplashScreen

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="Tasks"
            component={TasksScreen}
            options={{ title: 'Mis Tareas' }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
