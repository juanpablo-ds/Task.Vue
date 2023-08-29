<template>
    <div>
      <task-form :isEditing="true"/>
    </div>
  </template>
  
  <script lang="ts">
  import TaskForm from './TaskForm.vue';
  
  export default {
    components: {
      TaskForm,
    },
    mounted()
    {
        console.log("edited");
    },
};
  </script>
  