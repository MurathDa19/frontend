import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserService } from '../api/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    
    const login = async (token) => {
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);

        const user = await GetUserService();
        setUserData(user);
    }

    const logout = async () => {
        setUserToken(null);
        setUserData(null);
        await AsyncStorage.removeItem('userToken');
    }

    const isLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
            setIsLoading(false);
        } catch (error) {
            console.log('Error en persistencia, no cargo el token (archivo Auth):', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, isLoading, login, logout, isLoggedIn, userData }}>
            {children}
        </AuthContext.Provider>
    )
}
