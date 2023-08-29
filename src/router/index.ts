import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import TaskList from '../views/TaskList.vue';
import TaskForm from '../views/TaskForm.vue';
import TaskEdit from '../views/TaskEdit.vue';
import TaskView from '../views/TaskView.vue';
import Prueba from '../views/Prueba.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
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
