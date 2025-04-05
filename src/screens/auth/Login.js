import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../services/firebaseConfig'
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen');

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, user, password).then(
            (userCredential) => {
                console.log("Usuario Logueado", userCredential.user)
                setError(false)
                setErrorMessage("")
                navigation.navigate("Home")
            }
        ).catch((error)=>{
            setError(true);
            if(error.message=="Firebase: Error (auth/invalid-credential)."){
                setErrorMessage("Usuario y/o contraseña incorrecto.")
            }
            else{
                setErrorMessage("Se ha presentado un error")
                console.log(error.message)
            }
            
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

    const navigation= useNavigation();
    return(
        <View style={styles.container}>
                <View style={styles.containertitulo}>
            <Text style={styles.Titulo}>Iniciar Sesión</Text>
                </View>
                <View style={styles.container}>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Email" value={user} onChangeText={setUser}/>
                </View>
            <View style={styles.containerinput}>
                <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword}/>
                </View>
                </View>
            <View style={styles.containerbuttonlogin}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerlogin}>
                <TouchableOpacity style={styles.errorText} onPress={() => navigation.navigate('Register')}>
                    <Text>¿No se encuentra registrado?</Text>
                    <Text style={styles.loginText}>Registrarse</Text>
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
        marginBottom: height * 0.03,
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
        textAlign: 'center',
        fontWeight: 'bold'
    },

    containerlogin: {
        flex: 'auto',
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingTop: height * 0.3,
        backgroundColor: '#f0f0f0',
    },

    containerbuttonlogin: {
        flex: 'auto',
        alignItems: "center",
        padding: -100,
        justifyContent: 'flex-end',
        backgroundColor: '#f0f0f0',
    },
})
export default Login