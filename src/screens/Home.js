import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
const [tareas, setTareas] = useState([]);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');

const TASKS_KEY = 'TASKS';


useEffect(() => {
  const loadTasks = async () => {
    const stored = await AsyncStorage.getItem(TASKS_KEY);
    if (stored) setTareas(JSON.parse(stored));
  };
  loadTasks();
}, []);


useEffect(() => {
  AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tareas));
}, [tareas]);

const addTask = () => {
  if (!title.trim()) return;
  const newTarea = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };
  setTareas([...tareas, newTarea]);
  setTitle('');
  setDescription('');
};

const toggleComplete = (id) => {
  setTareas(tareas.map(tareas =>
    tareas.id === id ? { ...tareas, completed: !tareas.completed } : tareas
  ));
};

const deleteTask = (id) => {
  setTareas(tareas.filter(tareas => tareas.id !== id));
};

return (
  <View style={styles.container}>
    <Text style={styles.heading}>Mis Tareas ✅</Text>

    <FlatList
      data={tareas}
      keyExtractor={item => item.id.toString()}
      style={{ marginBottom: 20 }}
      renderItem={({ item }) => (
        <View style={styles.task}>
        <TouchableOpacity onPress={() => toggleComplete(item.id)}>
  <Text style={{ fontSize: 18 }}>
    {item.completed ? '✅' : '⬜️'}
  </Text>
</TouchableOpacity>
          <View style={styles.taskText}>
            <Text style={[styles.title, item.completed && styles.completed]}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={styles.delete}>❌</Text>
          </TouchableOpacity>
        </View>
      )}
    />
    <View style={styles.containerTask}>
    <TouchableOpacity>
    <Text style={styles.subheading}>Agregar tarea ➕</Text>
    </TouchableOpacity>
    <TextInput
      placeholder="Título"
      style={styles.input}
      value={title}
      onChangeText={setTitle}
    />
    <TextInput
      placeholder="Descripción"
      style={styles.input}
      value={description}
      onChangeText={setDescription}
    />
    <Button title="Guardar" onPress={addTask} />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  paddingTop: 60,
  flex: 1,
},
containerTask: {
    top: '-22%',
    flex: 1,
  },
heading: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
subheading: {
  fontSize: 18,
  marginTop: 10,
  marginBottom: 5,
},
input: {
  borderWidth: 1,
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
},
task: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#eee',
  padding: 10,
  marginBottom: 8,
  borderRadius: 6,
},
taskText: {
  flex: 1,
  marginLeft: 10,
},
title: {
  fontWeight: 'bold',
},
completed: {
  textDecorationLine: 'line-through',
  color: 'gray',
},
delete: {
  fontSize: 20,
  marginLeft: 8,
},
});

export default Home;