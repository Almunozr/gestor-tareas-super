import { Controller, Get, Post, Delete, Body, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService, Task } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    const task = this.tasksService.findOne(+id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Put(':id/complete')
  complete(@Param('id') id: string): Task {
    const task = this.tasksService.complete(+id);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const success = this.tasksService.remove(+id);
    if (!success) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Task deleted successfully' };
  }
}