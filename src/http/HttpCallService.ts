// src/api.ts
import axios from 'axios';
import { type Task } from '../models/Task';

const BASE_URL = 'https://localhost:7274/api'; // Cambia esto a la URL de tu backend

const instance = axios.create({
  baseURL: BASE_URL,
});

export const api = {
  async fetchTasks(): Promise<Task[]> {
    console.log('dentro de fetch tasks');
    const response = await instance.get<Task[]>('/Tarea');
    console.log('Response: ',response);
    console.log('fin ');
    return response.data;
  },

  async createTask(task: Task): Promise<Task> {
    const response = await instance.post<Task>('/Tarea', task);
    return response.data;
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await instance.put<Task>(`/Tarea/${task.id}`, task);
    return response.data;
  },

  async deleteTask(taskId: number): Promise<void> {
    await instance.delete(`/Tarea/${taskId}`);
  },
};
