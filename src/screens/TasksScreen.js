import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GetTasksService } from '../api/apiService';

export const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await GetTasksService();
        console.log('Datos recibidos:', JSON.stringify(data));
        setTasks(data.tareas);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTasks();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Text key={task.id} style={styles.task}>{task.titulo}</Text>
          
        ))
      ) : (
        <Text style={styles.error}>No tasks available</Text>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  task: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
});