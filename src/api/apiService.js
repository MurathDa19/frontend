import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.1.7:8000/api';

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