import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: 'AIzaSyCyxuHunYAd89xnfFVkz6591xAh1oPv9zY',
    authDomain: 'proyecto-myfiilm.firebaseapp.com',
    projectId: 'proyecto-myfiilm',
    storageBucket: 'proyecto-myfiilm.firebasestorage.app',
    messagingSenderId: '32095002969',
    appId: '1:32095002969:web:8e67c8dcf0ba9f55ee2c48',
    measurementId: 'G-0NQC6QMJYB'
  };
  
  const app= getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

  const auth= initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

  const storage = getStorage(app)

  export {auth, storage};