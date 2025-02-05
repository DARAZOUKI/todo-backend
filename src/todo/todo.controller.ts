import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll() {
    return await this.todoService.getAll();
  }

  @Post()
  async create(@Body() todoDto: CreateTodoDto) {
    return await this.todoService.create(todoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todoDto: CreateTodoDto) {
    return await this.todoService.update(id, todoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(id);
  }
}
