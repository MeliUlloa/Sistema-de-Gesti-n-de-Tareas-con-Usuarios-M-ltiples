import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      include: {
        tasks: true
      }
    })
  }

  create(data: {
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
  }) {
    return this.prisma.user.create({
      data
    })
  }

}