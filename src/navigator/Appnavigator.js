import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/authContext'; 
import { LoginScreen } from '../screens/LoginScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { ProfileHeader } from '../screens/DashboardScreen';
import { ChangeProfilePictureScreen } from '../screens/ChangeProfilePictureScreen';
import { EditTaskScreen } from '../screens/EditTaskScreen';



const Stack = createStackNavigator();

export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext); 

  if (isLoading) return null; 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="Dashboard"
            component={ProfileHeader}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
            name="TasksScreen"
            component={TasksScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ChangeProfilePictureScreen"
            component={ChangeProfilePictureScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="EditTaskScreen"
            component={EditTaskScreen}
            options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
