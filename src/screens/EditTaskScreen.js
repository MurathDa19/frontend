import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EditTaskService } from '../api/apiService';
import { useContext } from 'react';




export const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params; // ← recibe la tarea completa para pre-rellenar
  const [taskData, setTaskData] = useState({
    titulo: task.titulo,           // ← pre-rellena con los datos actuales
    descripcion: task.descripcion,
  });

  const handleEdit = async () => {
    try {
      await EditTaskService(task.id, taskData);
      Alert.alert('Éxito', 'Tarea editada correctamente.');
      navigation.navigate('TasksScreen');
    } catch (error) {
      Alert.alert('Error', 'No se pudo editar la tarea.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Tarea</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={taskData.titulo}
        onChangeText={(text) => setTaskData({ ...taskData, titulo: text })}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={taskData.descripcion}
        onChangeText={(text) => setTaskData({ ...taskData, descripcion: text })}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
        <Text style={styles.saveText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('TasksScreen')}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1A1A2E',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelText: {
    color: '#EF4444',
    fontWeight: '500',
    fontSize: 14,
  },
});