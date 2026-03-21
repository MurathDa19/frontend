import { AuthContext } from '../context/authContext';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import defaultProfileImage from '../../assets/default.jpg';
import { ChangeProfilePictureService } from '../api/apiService';



export const ProfileHeader = ({ navigation }) => {
    const { userData, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            {/* Card de perfil */}
            <View style={styles.profileCard}>
                <Image
                    source={
                        userData?.imagen_url
                            ? { uri: userData.imagen_url }
                            : defaultProfileImage
                    }
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.nameText}>Usuario ADSO</Text>
                    <Text style={styles.roleText}>
                        {userData?.rol === 'aprendiz' ? 'Aprendiz' : 'Instructor'}
                    </Text>
                </View>
            </View>

            {/* Botones */}
            <View style={styles.buttonsRow}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        navigation.navigate('TasksScreen');
                    }}
                >
                    <Text style={styles.buttonText}>Mis Tareas 🔍</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => {
                        navigation.navigate('ChangeProfilePictureScreen');
                    }}
                >
                    
                    <Text style={styles.buttonText}>Cambiar Foto 📷</Text>
                </TouchableOpacity>
            </View>

            {/* Cerrar sesión */}
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Cerrar sesión 🔒</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        padding: 20,
        paddingTop: 60,
        justifyContent: 'space-between',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        gap: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 35,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 4,
    },
    roleText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'green',
        textTransform: 'uppercase',
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#555',
    },
    logoutButton: {
        paddingVertical: 14,
        borderRadius: 16,
        backgroundColor: '#FFF1F2',
    },
    logoutText: {
        marginBottom: 'auto',
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: '#EF4444',
    },
});