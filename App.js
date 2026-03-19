import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { AuthProvider } from './src/context/authContext';
import { TasksScreen } from './src/screens/TasksScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          // ✅ Hay token → pantalla de tareas
          <Stack.Screen
            name="Tasks"
            component={TasksScreen}
            options={{ title: 'Mis Tareas' }}
          />
        ) : (
          // ❌ No hay token → pantalla de login
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
