import { Expose, Type } from 'class-transformer';

class UserTaskDto {
  @Expose()
  id: number;

  @Expose()
  confirmed: boolean;

  @Expose()
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
  };
}

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => UserTaskDto)
  tasks?: UserTaskDto[];
}
