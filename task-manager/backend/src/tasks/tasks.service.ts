import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: this.idCounter++,
      title: createTaskDto.title,
      completed: false,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  complete(id: number): Task | null {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      return task;
    }
    return null;
  }

  remove(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  findOne(id: number): Task | null {
    return this.tasks.find(t => t.id === id) || null;
  }
}