import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChangeProfilePictureService } from '../api/apiService';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const ChangeProfilePictureScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { refreshUserData } = useContext(AuthContext);

    const pickImage = async () => {
        
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería.');
            return;
        }

        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],   
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            Alert.alert('Sin imagen', 'Por favor selecciona una imagen primero.');
            return;
        }
        setLoading(true);
        try {
            
            await ChangeProfilePictureService(image);
            await refreshUserData();
            Alert.alert('Éxito', 'Foto actualizada correctamente.');
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la foto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📷 Cambiar Foto de Perfil</Text>

            {/* Preview de la imagen */}
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                    <Text style={styles.placeholderText}>No has seleccionado imagen.</Text>
                )}
            </TouchableOpacity>

            {/* Botón elegir de galería */}
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
                <Text style={styles.galleryButtonText}>Elegir de la galería</Text>
            </TouchableOpacity>

            {/* Botón guardar */}
            {image && (
                <TouchableOpacity style={styles.saveButton} onPress={handleUpload}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Guardar foto</Text>
                    )}
                </TouchableOpacity>
            )}

            {/* Cancelar */}
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Dashboard')}>
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
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 32,
    },
    imageContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        overflow: 'hidden',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    placeholderText: {
        fontSize: 13,
        color: '#9E9E9E',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    galleryButton: {
        borderWidth: 1.5,
        borderColor: '#22C55E',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginBottom: 16,
    },
    galleryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#22C55E',
    },
    saveButton: {
        backgroundColor: '#6C63FF',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    cancelButton: {
        marginTop: 'auto',
        paddingVertical: 10,
    },
    cancelText: {
        fontSize: 14,
        color: '#EF4444',
        fontWeight: '500',
    },
});