<template>
    <div>
      <h2>Detalle de Tarea</h2>
      <p>Nombre: {{ task?.titulo }}</p>
      <p>Fecha de Creación: {{ task?.fechaInicio }}</p>
      <p>Fecha de Finalización: {{ task?.fechaLimite || 'No completada' }}</p>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useTaskStore } from '../stores/store';
  import { type Task } from '../models/Task';
  
  const taskStore = useTaskStore();
  const route = useRoute();
  const task = ref<Task | null>(null);

  

  onMounted(() => {
    const taskId = Number(route.params.id);
    console.log('Task ID:', taskId);
    if (taskId) {
      console.log(taskStore.tasks);
      task.value = taskStore.tasks.find(t => t.id === taskId) || null;
    } else {
      // Manejar ID de tarea inválido o redirigir a una página de error
    }
  });
  </script>
  