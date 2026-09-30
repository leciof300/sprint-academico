import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import { colors } from '../theme/colors';
import { getTasks, saveTask, updateTaskStatus } from '../storage/taskStorage';
import { useIsFocused } from '@react-navigation/native'; 

export default function BacklogScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    if (isFocused) loadTasks();
  }, [isFocused]);

  const loadTasks = async () => {
    const savedTasks = await getTasks();
    setTasks(savedTasks.filter(t => t.status === 'backlog'));
  };

  const handleAddTask = async () => {
    if (taskInput.trim() === '') return;
    await saveTask(taskInput);
    setTaskInput('');
    Keyboard.dismiss();
    loadTasks();
  };

  const handleSendToSprint = async (taskId) => {
    await updateTaskStatus(taskId, 'todo'); 
    loadTasks(); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.sprintButton} onPress={() => handleSendToSprint(item.id)}>
        <Text style={styles.sprintButtonText}>Para Sprint 🏃</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📦 Product Backlog</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ex: Revisão Bibliográfica"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Seu backlog está vazio.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: colors.textTitle, marginBottom: 15 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, backgroundColor: colors.surface, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', marginRight: 10 },
  addButton: { backgroundColor: colors.primary, width: 55, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: colors.surface, fontSize: 24, fontWeight: 'bold' },
  taskCard: { backgroundColor: colors.surface, padding: 18, borderRadius: 8, marginBottom: 10, elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { fontSize: 16, color: colors.textTitle, flex: 1, marginRight: 10 },
  sprintButton: { backgroundColor: colors.gamification, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  sprintButtonText: { color: colors.surface, fontWeight: 'bold', fontSize: 12 },
  emptyText: { textAlign: 'center', color: colors.textBody, marginTop: 40 }
});