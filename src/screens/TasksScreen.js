import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DeleteTaskService, GetTasksService } from '../api/apiService';
import { AuthContext, refreshUserData } from '../context/authContext'


export const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { refreshUserData } = useContext(AuthContext)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await GetTasksService();
        setTasks(data.tareas);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = (taskId) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await DeleteTaskService(taskId)
              await refreshUserData();
              setTasks(tasks.filter((t) => t.id !== taskId)); 
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la tarea.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = async(task) => {
    navigation.navigate('EditTaskScreen', { task });
    await refreshUserData();
  };

  const TaskCard = ({ task }) => (
    <View style={styles.card}>

      {/* Header: título y badge */}
      <View style={styles.cardHeader}>
        <Text style={styles.taskTitle}>{task.titulo}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: task.estado === 'Pendiente' ? '#FFF3E0' : '#E8F5E9' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: task.estado === 'Pendiente' ? '#E65100' : '#2E7D32' }
          ]}>
            {task.estado}
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <Text style={styles.taskDescription}>{task.descripcion}</Text>

      {/* Footer: fecha y botones */}
      <View style={styles.cardFooter}>
        <Text style={styles.dateIcon}>📅</Text>
        <Text style={styles.taskDate}>{formatDate(task.fecha_creacion)}</Text>

        {/* Botones */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.iconButton, styles.editButton]}
            onPress={() => handleEdit(task)}
          >
            
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.deleteButton]}
            onPress={() => handleDelete(task.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Mis Tareas</Text>
      <Text style={styles.subtitle}>{tasks.length} tareas encontradas</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskCard task={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Botón agregar tarea */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTaskScreen')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  centered: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#9E9E9E',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  dateIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  taskDate: {
    fontSize: 12,
    color: '#9E9E9E',
    flex: 1,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  editButton: {
    backgroundColor: '#EEF2FF',
  },
  editText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C63FF',
  },
  deleteButton: {
    backgroundColor: '#FFF1F2',
  },
  deleteText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: '#6C63FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});