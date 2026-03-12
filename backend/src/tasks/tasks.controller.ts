import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto } from './dto'
import { JwtAuthGuard } from "../auth/jwt.guard"
import { RolesGuard } from "../auth/roles.guard"
import { Roles } from "../auth/roles.decorator"

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Roles('user', 'admin')
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto)
  }

  @Roles('user', 'admin')
  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Roles('admin')
  @Post(':taskId/assign/:userId')
  assignUser(
    @Param('taskId') taskId: string,
    @Param('userId') userId: string
  ) {
    return this.tasksService.assignUser(
      Number(taskId),
      Number(userId)
    )
  }

  @Roles('user', 'admin')
  @Post(':taskId/confirm/:userId')
  confirmTask(
    @Param('taskId') taskId: string,
    @Param('userId') userId: string
  ) {
    return this.tasksService.confirmTask(
      Number(taskId),
      Number(userId)
    )
  }

  @Roles('admin')
  @Put(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.update(Number(taskId), updateTaskDto)
  }

  @Roles('admin')
  @Delete(':taskId')
  delete(@Param('taskId') taskId: string) {
    return this.tasksService.delete(Number(taskId))
  }

  @Roles('user', 'admin')
  @Get('user/:userId')
  findTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.findTasksByUser(Number(userId))
  }

}
