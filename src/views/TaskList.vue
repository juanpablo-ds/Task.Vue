<template>
  <div>
    <button @click="createTask()" class="p-button p-button-success p-mb-3">
      <i class="pi pi-plus"></i> Crear Tarea
    </button>
    <h2>Lista de Tareas</h2>
    <table class="p-table">
      <thead>
        <tr>
          <th>Titulo de Tarea</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in taskStore.tasks" :key="task.id">
          <td>{{ task.titulo }}</td>
          <td>
           <div class="actions-container">
              <button @click="editTask(task)" class="p-button p-button-secondary">
                <i class="pi pi-pencil"></i>
              </button>
              <button @click="deleteTask(task.id)" class="p-button p-button-danger">
                <i class="pi pi-trash"></i>
              </button>
           </div>
          </td>
        </tr>
      </tbody>
    </table>
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

<style scoped>
@import 'primevue/resources/themes/saga-blue/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';

.p-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.actions-container {
  display: flex;
  justify-content: space-evenly;
  gap: 0.5rem;
}
.p-table th, .p-table td {
  padding: 1rem;
  border: 1px solid #ccc;
  text-align: center;
}

.p-button {
  margin-right: 0.5rem;
}

.p-mb-3 {
  margin-bottom: 1rem;
}
</style>
