import { Model } from "mongoose";
import { CreateTodoDto } from "./todo.dto";
import { Todo, TodoDocument } from "./todo.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  // Fetch all todos from the database
  async getAll(page = 1, limit = 10): Promise<Todo[]> {
    const skip = (page - 1) * limit;
    return this.todoModel.find().skip(skip).limit(limit).exec();
  }
  

  // Create a new todo
  create(todoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(todoDto);
    return createdTodo.save();  // Save the new todo to MongoDB
  }

  
 // Update an existing todo
 async update(id: string, todoDto: CreateTodoDto): Promise<Todo | null> {
  try {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todoDto, { new: true });
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  } catch (error) {
    throw new Error(`Error updating todo: ${error.message}`);
  }
}

async delete(id: string): Promise<Todo> {
  try {
    const todo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  } catch (error) {
    throw new Error(`Error deleting todo: ${error.message}`);
  }
}
}

