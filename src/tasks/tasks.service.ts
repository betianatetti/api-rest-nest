import { Injectable } from '@nestjs/common';
import { Task } from "./interfaces/task";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>){}

    async getTasks(){
        return await this.taskModel.find();
    }

    async getTask(id: string): Promise<Task>{
        const task = await this.taskModel.findById(id);
        return task
    }

    async createTask(task: CreateTaskDto){
        const newTask = new this.taskModel(task);
        return await newTask.save()
    }

    async deleteTask(id: string): Promise<any>{
        const deletedTask = await this.taskModel.findOneAndDelete(id);
        return deletedTask;
    }

    async updateTask(id: string, createTaskDto: CreateTaskDto): Promise<Task>{
        const updateTask = await this.taskModel.findByIdAndUpdate(id, createTaskDto, {new: true});
        return updateTask;
    }
}
