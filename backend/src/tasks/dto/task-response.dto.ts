import { Expose, Type } from 'class-transformer';

class TaskUserDto {
  @Expose()
  id: number;

  @Expose()
  confirmed: boolean;

  @Expose()
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export class TaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  status: string;

  @Expose()
  priority: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Expose()
  @Type(() => TaskUserDto)
  users?: TaskUserDto[];
}
