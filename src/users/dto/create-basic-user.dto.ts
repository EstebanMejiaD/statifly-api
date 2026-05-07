import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateBasicUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

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
        'La contraseña no puede ser menor a 8 caracteres y debe contener al menos una letra mayúscula, una letra minúscula y un número',
    },
  )
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  groupId?: number;

  @ApiProperty()
  @IsBoolean()
  state: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  companyCode?: number;

  @IsString()
  @ApiProperty()
  user: string;

  @IsString()
  @ApiProperty()
  key: string;
}
