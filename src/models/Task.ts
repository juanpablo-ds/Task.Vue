// src/models/Task.ts
export interface Task {
    id: number;
    titulo: string;
    fechaInicio: Date;
    fechaLimite: Date | null;
    tiempoFaltante:  TiempoFaltante
  }



  export interface TiempoFaltante {
    dias:number;
    horas: number;
  }