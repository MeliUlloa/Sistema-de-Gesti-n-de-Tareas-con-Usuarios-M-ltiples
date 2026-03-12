import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
