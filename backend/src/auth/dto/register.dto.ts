import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
