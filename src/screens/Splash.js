import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native";


const Splash = () => {
    const navigation= useNavigation();

    useEffect(() => {
        const timer= setTimeout(() => {
            navigation.replace("Login")
        },2000); return () => clearTimeout(timer);
    }, [navigation])
    return(
        <View style={styles.container}>
            <Text style={styles.text}>BIENVENIDO</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
        resizeMode: 'cover',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

export default Splash