// src/store.ts
import { defineStore } from 'pinia';
import { type Task } from '../models/Task';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
    },
    updateTask(updatedTask: Task) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    },
    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    assignTasks(tasks: Task[]){
      this.tasks = tasks;
    }

  },
});
