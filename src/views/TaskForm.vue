<template>
    <div>
        <h2>{{ editing ? 'Editar Tarea' : 'Crear Tarea' }}</h2>
      <form @submit="saveTask">
        <label for="titulo">Título:</label>
        <input v-model="task.titulo" id="titulo" required />
  
        <label for="fechaInicio">Fecha de Inicio:</label>
        <input type="date" v-model="task.fechaInicio" id="fechaInicio" required />
  
        <label for="fechaLimite">Fecha Límite:</label>
        <input type="date" v-model="task.fechaLimite" id="fechaLimite" />
  
        <button type="submit">{{ editing ? 'Actualizar' : 'Crear' }}</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref ,onMounted} from 'vue';
  import { useRouter } from 'vue-router';
  import { useTaskStore } from '../stores/store';
  import { api } from '../http/HttpCallService';
  import { type Task } from '../models/Task';
  import { type TiempoFaltante} from '../models/Task';
  
  const taskStore = useTaskStore();
  const router = useRouter();
  const tiempoFaltante : TiempoFaltante = {dias: 0 , horas:0}
  const task = ref<Task>({ id: 0, titulo: '', fechaInicio: new Date(), fechaLimite: new Date(), tiempoFaltante});
  const editing = ref(false);
 
const props = defineProps({
  taskId: Number,
});

  onMounted(() => {
  if (props.taskId) {
    const existingTask = taskStore.tasks.find(t => t.id === props.taskId);
    if (existingTask) {
      editing.value = true;
      task.value = { ...existingTask };
    } else {
      // Manejar la tarea no encontrada o redirigir a una página de error
    }
  }
});
  
  const saveTask = async () => {
    if (editing.value) {
        console.log('actualizando');
      await api.updateTask(task.value);
    } else {
        console.log('creando ');
      await api.createTask(task.value);
    }
    taskStore.updateTask(task.value);
   router.go(-2); 

  };
  </script>



  