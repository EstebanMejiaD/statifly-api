import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsStrongPassword({ minLength: 8 })
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsNumber()
  groupId?: number;

  @ApiProperty()
  @IsBoolean()
  state: boolean;
}
