import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { EditTaskService } from '../api/apiService';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const EditTaskScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [taskData, setTaskData] = useState({
    titulo: '',
    descripcion: '',
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={taskData.titulo}
        onChangeText={(text) => setTaskData({ ...taskData, titulo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={taskData.descripcion}
        onChangeText={(text) => setTaskData({ ...taskData, descripcion: text })}
      />
      <Button
        title="Guardar cambios"
        onPress={async () => {
          try {
            await EditTaskService(taskId, taskData);
            navigation.goBack(); // vuelve a TasksScreen
          } catch (error) {
            console.error('Error al editar la tarea:', error);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});