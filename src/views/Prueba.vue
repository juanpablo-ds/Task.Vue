<template>
    <div>
      <h2>Verificación de Tareas Almacenadas en el Store</h2>
      <pre>{{ taskStore.tasks }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useTaskStore } from '../stores/store';
  import { api } from '../http/HttpCallService';
  
  const taskStore = useTaskStore();
  
  onMounted(async () => {
    const fetchedTasks = await api.fetchTasks();
    taskStore.assignTasks(fetchedTasks);
  });
  </script>
  
  