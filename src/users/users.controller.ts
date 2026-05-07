import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from 'src/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateBasicUserDto } from './dto/create-basic-user.dto';
import { envs } from 'src/config';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res() res: Response,
  ) {
    const response = await this.usersService.register({
      ...registerUserDto,
    });
    res.status(response.status).json(response);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SUPERADMIN)
  // @Post()
  // async create(@Body() createUserDto: RegisterUserDto, @Res() res: Response) {
  //   const response = await this.usersService.register(createUserDto);
  //   res.status(response.status).json(response);
  // }


  // @Post('createBasicSuperAdmin')
  // async createBasicSuperAdmin(@Body() createBasicUserDto: CreateBasicUserDto, @Res() res: Response) {
   
  //   const { user, key, email, name, password, role, state, companyCode, groupId } = createBasicUserDto;

  //   if (user !== envs.userSecret || key !== envs.keySecret) {
  //     const responseError: ResponseDto<null> = {
  //       status: 403,
  //       message: 'Not authorized',
  //       data: null,
  //     };
  //     return res.status(responseError.status).json(responseError);
  //   }

  //   const newUser: RegisterUserDto = {
  //     email,
  //     name,
  //     password,
  //   } 

  //   const response = await this.usersService.register(newUser);
  //   res.status(response.status).json(response);
  // }  

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const response = await this.usersService.login(loginDto);
    res.status(response.status).json(response);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SUPERADMIN)
  // @Get(':companyCode')
  // async findAll(@Param('companyCode') companyCode: string, @Res() res: Response) {
  //   const response = await this.usersService.findAll(+companyCode);
  //   res.status(response.status).json(response);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @CurrentUser() user: JwtPayload,
  ) {
    if (user.sub != id) {
      res.status(403).json({
        status: 403,
        message: 'No tienes permiso para actualizar este usuario',
        data: undefined,
      });
      return;
    }
    const response = await this.usersService.updateUser(
      id,
      updateUserDto,
    );
    res.status(response.status).json(response);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.SUPERADMIN)
  // @Delete(':id')
  // async deleteUser(@Param('id') id: number, @Res() res: Response) {
  //   const response = await this.usersService.deleteUser(Number(id));
  //   res.status(response.status).json(response);
  // }
}
