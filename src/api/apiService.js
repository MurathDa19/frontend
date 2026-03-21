import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.45.229.92:8000/api';

export const LoginService = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // await AsyncStorage.setItem('token', data.token);
      // Retorna los datos.
      return data;
    } else {
      throw new Error(data.message || 'Login failed');
    }

  } catch (error) {
    throw error;
  }
};

export const RegisterService = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // Retorna los datos.
      return data;
    } else {
      throw new Error(data.message || 'Register failed');
    }
  } catch (error) {
    throw error;
  }
}

export const GetTasksService = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/tareas/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      // Retorna los datos.
      return data;
    } else {
      throw new Error(data.message || 'Get tasks failed');
    }
  } catch (error) {
    throw error;
  }
}

export const GetUserService = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await fetch(`${BASE_URL}/profile/image/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message || 'Get user failed');
  }
};

export const AddTaskService = async (taskData) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/tareas/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Add task failed');
    }
  } catch (error) {
    throw error;
  }
};

export const DeleteTaskService = async (taskId) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/tareas/${taskId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Delete task failed');
    }
  } catch (error) {
    throw error;
  }
};
export const ChangeProfilePictureService = async (imageUri) => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    
    const formData = new FormData();
    formData.append('imagen', {
      uri: imageUri,         
      type: 'image/jpeg',     
      name: 'profile.jpg',   
    });

    const response = await fetch(`${BASE_URL}/profile/image/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,

      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Change profile picture failed');
    }
  } catch (error) {
    throw error;
  }
};