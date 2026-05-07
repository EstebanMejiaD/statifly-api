import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
