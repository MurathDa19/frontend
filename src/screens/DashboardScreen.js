import { AuthContext } from '../context/authContext';
import { Image, Text, View, Button, StyleSheet } from 'react-native';
import { useContext } from 'react';
import defaultProfileImage from '../../assets/default.jpg';



export const ProfileHeader = () => {
    const { userData, logout } = useContext(AuthContext);

    return (
        <View style={styles.Container}>
            <View style={styles.profileSection}>
                <Image
                    source={
                        userData?.imagen_url
                            ? { uri: userData.imagen_url }
                            : defaultProfileImage
                    }
                    onError={() => console.log('Error cargando imagen')}
                    style={{ width: 100, height: 100, borderRadius: 60 }}
                />
                <Text style={styles.nameText}>{userData?.rol === 'aprendiz' ? (<Text>Aprendiz ADSO</Text>) : (<Text>Instructor ADSO</Text>)}</Text>
                <Text style={styles.roleText}>{userData?.rol}</Text>
                <Button title="Cerrar sesión" onPress={logout} />
            </View>
            <View style={styles.createTaskSection} onPress={() => navigation.navigate('CreateTaskScreen')}>
                <Text>Crear Tareas 📒</Text>
            </View>
            <View style={styles.changeProfilePicture} onPress={() => navigation.navigate('ChangeProfilePictureScreen')}>
                <Text>Cambiar Foto de Perfil 📷</Text>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridGap: 20,
    },
    profileSection: {
        alignItems: 'center',
        gridColumn: '1/5',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    roleText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        marginVertical: 10,
    },
    createTaskSection: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        gridColumn: 'span 2',
    },
    changeProfilePicture: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        gridColumn: 'span 1',
    },
});