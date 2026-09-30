import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { getTasks, updateTaskStatus } from '../storage/taskStorage';
import { useIsFocused } from '@react-navigation/native';

export default function SprintScreen() {
  const [sprintTasks, setSprintTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadSprintTasks();
  }, [isFocused]);

  const loadSprintTasks = async () => {
    const savedTasks = await getTasks();
    setSprintTasks(savedTasks.filter(t => t.status !== 'backlog'));
  };

  const handleMoveTask = async (taskId, currentStatus) => {
    let newStatus = 'todo';
    if (currentStatus === 'todo') newStatus = 'doing'; 
    else if (currentStatus === 'doing') newStatus = 'done'; 
    
    await updateTaskStatus(taskId, newStatus);
    loadSprintTasks();
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.statusBadge}>Status: {item.status.toUpperCase()}</Text>
      </View>
      {item.status !== 'done' && (
        <TouchableOpacity style={styles.moveButton} onPress={() => handleMoveTask(item.id, item.status)}>
          <Text style={styles.moveButtonText}>Avançar ➡️</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏃 Sprint da Semana</Text>
      <FlatList
        data={sprintTasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma tarefa na Sprint atual.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: colors.primary, marginBottom: 15 },
  taskCard: { backgroundColor: colors.surface, padding: 18, borderRadius: 8, marginBottom: 10, elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, color: colors.textTitle, fontWeight: 'bold' },
  statusBadge: { fontSize: 12, color: colors.textBody, marginTop: 5 },
  moveButton: { backgroundColor: colors.success, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  moveButtonText: { color: colors.surface, fontWeight: 'bold', fontSize: 12 },
  emptyText: { textAlign: 'center', color: colors.textBody, marginTop: 40 }
});