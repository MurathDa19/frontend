import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { LoginService } from '../api/apiService';

export const LoginScreen = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {

        if (!email || !password) {
            return Alert.alert('Error', 'Completa todos los campos.');
        }
        setIsLoading(true);
        try {
            const data = await LoginService(email, password);
            login(data.token); // Guarda el token globalmente.
            
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', error.message || 'Está mal 🗣️🔥');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>ADSO gestor de tareas</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} color="blue" />
            {isLoading && <ActivityIndicator size="large" style={styles.loading} color="blue" />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'blue',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    loading: {
        marginTop: 20,
    },
})

