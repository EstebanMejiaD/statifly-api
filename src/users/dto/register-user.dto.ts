import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Esteban',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'esteban@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '3001234567',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    example: 'Statifly2026',
  })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number',
    },
  )
  password!: string;
}