import { Injectable, BadRequestException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  findAll() {
    // never return the password hash to consumers
    // we can't mix include + select per Prisma rules, so use select exclusively
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        tasks: {
          include: {
            task: true,
          }
        }
      }
    })
  }

  /**
   * Create a new user while enforcing business rules:
   *  - password is hashed with bcrypt
   *  - role must be one of the allowed values (typescript already ensures it)
   *  - email must not already exist (checked and database has unique constraint)
   *  - any additional invalid props are stripped by ValidationPipe
   */
  async create(data: {
    name: string
    email: string
    password: string
    role: 'admin' | 'user'
  }) {
    // ensure role is one of the enum values – the DTO validation already handles this,
    // but double check just in case someone bypasses it programmatically.
    if (data.role !== 'admin' && data.role !== 'user') {
      throw new BadRequestException('Invalid role provided')
    }

    // check for duplicate email before attempting to create
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email }
    })
    if (existing) {
      // also Prisma will throw a unique constraint error, but we standardize response
      throw new ConflictException('Email already in use')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    // create then select fields to avoid leaking hashed password
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
  }

}