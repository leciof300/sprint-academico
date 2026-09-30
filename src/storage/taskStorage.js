import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@sprint_tasks';

export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar tarefas", e);
    return [];
  }
};

export const saveTask = async (taskName) => {
  try {
    const currentTasks = await getTasks();
    const newTask = {
      id: Date.now().toString(),
      title: taskName,
      status: 'backlog', 
    };
    currentTasks.push(newTask);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(currentTasks));
    return newTask;
  } catch (e) {
    console.error("Erro ao salvar tarefa", e);
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
  } catch (e) {
    console.error("Erro ao atualizar tarefa", e);
  }
};