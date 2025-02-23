import { Controller, Get, Post, Put, Delete, Body, Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return await this.todoService.getAll(page, limit);
  }

  @Post()
  async create(@Body() todoDto: CreateTodoDto) {
    try {
      return await this.todoService.create(todoDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todoDto: CreateTodoDto) {
    try {
      return await this.todoService.update(id, todoDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.todoService.delete(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
