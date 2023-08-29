<template>
  <div class="task-detail">
    <h2>Detalle de Tarea</h2>
    <div class="task-info">
      <p><strong>Nombre:</strong> {{ task?.titulo }}</p>
      <p><strong>Fecha de Creación:</strong> {{ task?.fechaInicio }}</p>
      <p><strong>Fecha de Finalización:</strong> {{ task?.fechaLimite || 'No completada' }}</p>
    </div>
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
  if (taskId) {
    task.value = taskStore.tasks.find(t => t.id === taskId) || null;
  } else {
    // Manejar ID de tarea inválido o redirigir a una página de error
  }
});
</script>

<style scoped>
.task-detail {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-info {
  margin-top: 15px;
}

.task-info p {
  margin: 5px 0;
}
</style>
