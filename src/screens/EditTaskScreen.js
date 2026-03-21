import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { EditTaskService } from '../api/apiService';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const EditTaskScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: false,
  });
}