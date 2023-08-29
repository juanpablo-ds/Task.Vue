<template>
  <div>
    <button @click="createTask()">Crear Tarea</button>
    <h2>Lista de Tareas</h2>
    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id">
        {{ task.titulo }} <button @click="editTask(task)">Editar</button> <button @click="deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '../stores/store';
import { api } from '../http/HttpCallService';
import { type Task } from '../models/Task';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const taskStore = useTaskStore();
const router = useRouter();

onMounted(async () => {
  console.log("on");
  taskStore.assignTasks(await api.fetchTasks());
});

const editTask = (task: Task) => {
  router.push({ name: 'editTask', params: { id: task.id } });
};

const createTask = () => {
  router.push({ name: 'createTask' });
};

const deleteTask = async (taskId: number) => {
  await api.deleteTask(taskId);
  taskStore.deleteTask(taskId);
};
</script>
