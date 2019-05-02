import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from "./dto/create-task.dto"
import { TasksService } from "./tasks.service";
import { Task } from "./interfaces/task";


@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService){}

    @Get()
    getTasks(): Promise <Task[]>{
        return this.taskService.getTasks();
    }

    @Get('/:taskId')
    async getTask(@Res() res,@Param('taskId') taskId){
        const task = await this.taskService.getTask(taskId);
        if(!task) throw new NotFoundException('Task does not exist!');
        return res.status(HttpStatus.OK).json(task);
    }

    @Post()
    async createTask(@Body() task: CreateTaskDto): Promise<Task>{
        return await this.taskService.createTask(task)
    }

    @Delete(':taskId')
    async deleteTask(@Res() res, @Param('taskId') taskId){
        const taskDeleted = await this.taskService.deleteTask(taskId);
        if (!taskDeleted) throw new NotFoundException('Task does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Task Deleted Successfully',
            taskDeleted
        });
    }

    @Put(':taskId')
    async updateTask(@Res() res, @Body() task:CreateTaskDto, @Param('taskId') taskId) {
        const updatedTask = await this.taskService.updateTask(taskId, task);
        if(!updatedTask) throw new NotFoundException('Task does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Task Updated Successfully',
            updatedTask
        });
    }

}
