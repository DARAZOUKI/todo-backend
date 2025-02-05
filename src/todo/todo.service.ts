import { Model } from "mongoose";
import { CreateTodoDto } from "./todo.dto";
import { Todo, TodoDocument } from "./todo.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  // Fetch all todos from the database
  getAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  // Create a new todo
  create(todoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(todoDto);
    return createdTodo.save();  // Save the new todo to MongoDB
  }

  
 // Update an existing todo
async update(id: string, todoDto: CreateTodoDto): Promise<Todo | null> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todoDto, { new: true });
    return updatedTodo; // Ensure the updated todo with _id is returned
  }

  // Delete a todo by ID
  async delete(id: string): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
}

