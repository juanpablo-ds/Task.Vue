import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/TaskList.vue';
import TaskForm from '../views/TaskForm.vue';
import TaskEdit from '../views/TaskEdit.vue';
import TaskView from '../views/TaskView.vue';
import Prueba from '../views/Prueba.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'taskList',
      component: TaskList,
    },
    {
      path: '/tasks/create',
      name: 'createTask',
      component: TaskForm,
    },
    {
      path: '/tasks/:id/edit',
      name: 'editTask',
      component: TaskEdit,
    },
    {
      path: '/tasks/:id',
      component: TaskView,
    },
    {
      path: '/tasks/prueba',
      component: Prueba,
    },
  ]
})

export default router
