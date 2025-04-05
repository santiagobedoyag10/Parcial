import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../services/firebaseConfig'
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen');

const Register = () => {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState(false)
    const [error, setError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigation= useNavigation();

    const handleRegsiter = ()=>{
        if(!name || !user || !password){
            setError(true);
            setErrorMessage("Todos los campos son obligatorios")
        }
        createUserWithEmailAndPassword(auth, user, password)
        .then((userCredencials) =>{
            const user = userCredencials.user

            updateProfile(user, {
                displayName: name,

            }).then(()=>{
                navigation.navigate('Login', {screen: 'Login'})
            }).catch((error)=>{
                setError(true)
                setErrorMessage(error.message)
            })
        })
        .catch((error)=>{
            setError(true)
        })
    }

    const handleChangeUser = (text) => {
        setUser(text);
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
        setErrorMessage(isValid ? 'true' : 'Formato de correo inválido');
      };
    
      const handleChangePassword = (text) => {
        setPassword(text);
        const isValid = text.length >= 6;
        setErrorMessage(isValid ? 'true' : 'Formato de contraseña invalido');
      };

    return(
        <View style={styles.container}>
                <View style={styles.containertitulo}>
            <Text style={styles.Titulo}>Registro</Text>
                </View>
            <View style={styles.container}>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName}/>
                </View>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Email" value={user} onChangeText={setUser}/>
                </View>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword}/>
                </View>
                </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.loginButton} onPress={handleRegsiter}>
                    <Text style={styles.loginButtonText}>Crear Cuenta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerlogin}>
                <TouchableOpacity style={styles.errorText} onPress={() => navigation.navigate('Login')}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text style={styles.loginText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 'auto',
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: height * 0.07,
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: width * 0.8,
        height: height * 0.20,
        resizeMode: 'contain',
        marginBottom: height * -0.02,
    },
    containertitulo: {
        top: '5%',
        marginTop: '15%',
        alignItems: "center",
        marginBottom: height * 0.05,
    },
    Titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    containerinput: {
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 25,
        marginBottom: height * 0.02,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#000',
        width: width * 0.8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    icon: {
        marginRight: 10,
        color: '#000',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#dd2b2b',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: height * 0.05,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    loginText: {
        color: '#dd2b2b',
        fontSize: 16,
        textAlign: 'center'
    },

    containerlogin: {
        flex: 'auto',
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingTop: height * 0.2,
        backgroundColor: '#f0f0f0',
    },
});
export default Register