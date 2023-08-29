<template>
    <div>
        <h2>Editar Tarea</h2>
      <form @submit="saveTask">
        <label for="titulo">Título:</label>
        <input v-model="task.titulo" id="titulo" required />
  
        <label for="fechaInicio">Fecha de Inicio:</label>
        <input type="date" v-model="task.fechaInicio" id="fechaInicio" required />
  
        <label for="fechaLimite">Fecha Límite:</label>
        <input type="date" v-model="task.fechaLimite" id="fechaLimite" />
  
        <button type="submit"> Actualizar</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref ,onMounted} from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTaskStore } from '../stores/store';
  import { api } from '../http/HttpCallService';
  import { type Task } from '../models/Task';
  import { type TiempoFaltante} from '../models/Task';
  
  const taskStore = useTaskStore();
  const router = useRouter();
  const route = useRoute();
  const tiempoFaltante : TiempoFaltante = {dias: 0 , horas:0}
  const task = ref<Task>({ id: 0, titulo: '', fechaInicio: new Date(), fechaLimite: new Date(), tiempoFaltante});
  const editing = ref(false);
 
    const props = defineProps({
        taskId: Number,
    });

  onMounted(() => {
    
    const id = +route.params.id;
    console.log(id);
  if (id && id>0) {
    const existingTask = taskStore.tasks.find(t => t.id === id);
    console.log("exists task: ",editing)
    if (existingTask) {
      editing.value = true;
      task.value = { ...existingTask };
      console.log(task.value.fechaInicio)
      console.log(task.value.fechaLimite)
    } else {
      // Manejar la tarea no encontrada o redirigir a una página de error
    }
  }
});
  
  const saveTask = async () => {
    console.log('actualizando',task.value.id,task.value.fechaInicio,task.value.fechaLimite);
    await api.updateTask(task.value);
    taskStore.updateTask(task.value);
  };
  </script>



  