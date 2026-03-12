import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTaskDto, UpdateTaskDto } from './dto'

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto
    })
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    })
  }

  async assignUser(taskId: number, userId: number) {
    return this.prisma.taskUser.create({
      data: {
        taskId,
        userId
      }
    })
  }

  async confirmTask(taskId: number, userId: number) {

    await this.prisma.taskUser.updateMany({
      where: {
        taskId,
        userId
      },
      data: {
        confirmed: true
      }
    })

    const remaining = await this.prisma.taskUser.count({
      where: {
        taskId,
        confirmed: false
      }
    })

    if (remaining === 0) {
      await this.prisma.task.update({
        where: { id: taskId },
        data: { status: "completed" }
      })
    }

    return { message: "Confirmación registrada" }
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id: taskId },
      data: updateTaskDto,
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    })
  }

  async delete(taskId: number) {
    // Primero eliminar las relaciones en TaskUser
    await this.prisma.taskUser.deleteMany({
      where: { taskId }
    })
    
    // Luego eliminar la tarea
    return this.prisma.task.delete({
      where: { id: taskId }
    })
  }

  async findTasksByUser(userId: number) {
    return this.prisma.taskUser.findMany({
      where: { userId },
      include: {
        task: {
          include: {
            users: {
              include: {
                user: true
              }
            }
          }
        }
      }
    })
  }

}