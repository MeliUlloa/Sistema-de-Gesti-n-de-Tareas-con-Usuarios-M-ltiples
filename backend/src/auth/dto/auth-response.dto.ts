import { Expose, Type } from 'class-transformer';

export class AuthResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  token?: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
