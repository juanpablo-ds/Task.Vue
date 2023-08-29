<template>
    <div>
        <h1 class="text">Editar Tarea</h1>
      <form @submit="saveTask" class="task-form">
        <label for="titulo">Título:</label>
        <input v-model="task.titulo" id="titulo" required />

        <label for="fechaInicio">Fecha de Inicio:</label>
        <input type="date" v-model="formattedFechaInicio" id="fechaInicio" required />

        <label for="fechaLimite">Fecha Límite:</label>
        <input type="date" v-model="formattedFechaLimite" id="fechaLimite" />
  
        <button type="submit"> Actualizar</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useTaskStore } from '../stores/store';
  import { api } from '../http/HttpCallService';
  import { type Task } from '../models/Task';
  import { type TiempoFaltante} from '../models/Task';
  
  const taskStore = useTaskStore();
  const routerInstance = useRouter();
  const route = useRoute();
  const tiempoFaltante : TiempoFaltante = {dias: 0 , horas:0}
  const task = ref<Task>({ id: 0, titulo: '', fechaInicio: new Date(), fechaLimite: new Date(), tiempoFaltante});
  const editing = ref(false);
  
  const props = defineProps({
    taskId: Number,
  });
  
  const parseAndFormatDate = (dateString: string) => {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  let formattedFechaInicio = ref<String>("");
  let formattedFechaLimite = ref<String>("");

  onMounted(() => {
    
    const id = +route.params.id;
    console.log(id);
  if (id && id>0) {
    const existingTask = taskStore.tasks.find(t => t.id === id);
    console.log("exists task: ",editing)
    if (existingTask) {
      editing.value = true;
      task.value = { ...existingTask };
      formattedFechaInicio.value = parseAndFormatDate(task.value.fechaInicio);
      formattedFechaLimite.value = parseAndFormatDate(task.value.fechaLimite || '');
      console.log(task.value.fechaInicio);
      console.log(task.value.fechaLimite);
    } else {
      // Manejar la tarea no encontrada o redirigir a una página de error
    }
  }
});
  
  
  const saveTask = async () => {
    console.log('Guardando tarea...', task.value.id, task.value.fechaInicio, task.value.fechaLimite);

    // Actualizar las fechas en el objeto task antes de guardar
    task.value.fechaInicio = new Date(formattedFechaInicio.value);
    task.value.fechaLimite = new Date(formattedFechaLimite.value);

    await api.updateTask(task.value);
    taskStore.updateTask(task.value);
    console.log('Tarea guardada. Redirigiendo al usuario a la ruta de la lista de tareas...');
    routerInstance.push({ path: '/' }); // Usa routerInstance en lugar de router
  };
</script>



<style scoped>

.text{
  text-align: center;
}
.task-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-form label {
  display: block;
  margin-top: 10px;
}

.task-form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-form button {
  display: block;
  margin-top: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>

  