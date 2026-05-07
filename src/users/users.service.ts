import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/common/enums/role.enum';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<ResponseDto<Omit<User, 'password'> | undefined>> {
    let response: ResponseDto<Omit<User, 'password'> | undefined>;
    try {
      const { email, password } = registerUserDto;

      const userExists = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (userExists) {
        response = {
          status: 409,
          message: 'El usuario ya existe',
          data: undefined,
        };
        return response;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...registerUserDto,
          password: hashedPassword,
        },
        omit: {
          password: true,
        },
      });

      response = {
        status: 201,
        message: 'Usuario registrado con éxito',
        data: user,
      };
      return response;
    } catch (error: any) {
      this.logger.error('Error al registrar usuario', error.message);
      response = {
        status: 500,
        message: 'Error al registrar usuario',
        data: undefined,
      };
    }
    return response;
  }

  async login(loginDto: LoginDto): Promise<ResponseDto<Omit<User, 'password'> | undefined>> {
    let response: ResponseDto<Omit<User, 'password'> | undefined>;
    try {
      const { email, password } = loginDto;

      let user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        response = {
          status: 401,
          message: 'Credenciales inválidas',
          data: undefined,
        };
        return response;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        response = {
          status: 401,
          message: 'Credenciales inválidas',
          data: undefined,
        };
        return response;
      }

      const payload = { sub: user.id, role: user.role };


      // Elimina el password del objeto user antes de retornarlo
      const { password: userPassword, ...userWithoutPassword } = user;

      const userLogin = {
        ...userWithoutPassword,
      };
      response = {
        status: 200,
        message: 'Login exitoso',
        data: userLogin,
        token: this.jwtService.sign(payload),
      };
      return response;
    } catch (error: any) {
      this.logger.error('Error al iniciar sesión', error.message);
      response = {
        status: 500,
        message: 'Error al iniciar sesión',
        data: undefined,
      };
      return response;
    }
  }

  async findAll(): Promise<ResponseDto<any>> {
    let response: ResponseDto<any>;
    try {
      const users = await this.prisma.user.findMany({
        omit: {
          password: true,
        },
      });

      response = {
        status: 200,
        message: 'Usuarios encontrados',
        data: users,
      };
    } catch (error: any) {
      this.logger.error('Error al buscar usuarios', error.message);
      response = {
        status: 500,
        message: 'Error al buscar usuarios',
        data: undefined,
      };
    }
    return response;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<ResponseDto<Omit<User, 'password'> | undefined>> {
    let response: ResponseDto<Omit<User, 'password'> | undefined>;
    try {
      console.log({ id, updateUserDto });

      const { email, password } = updateUserDto;


      if (email) {
        const userWithEmail = await this.prisma.user.findUnique({
          where: { email },
        });
        if (userWithEmail && userWithEmail.id !== id) {
          response = {
            status: 400,
            message: 'El email ya está en uso',
            data: undefined,
          };
          return response;
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          password: hashedPassword,
        },
        omit: {
          password: true,
        },
      });
      response = {
        status: 200,
        message: 'Usuario actualizado con éxito',
        data: user,
      };
    } catch (error: any) {
      this.logger.error('Error al actualizar usuario: ', error.message);
      response = {
        status: 500,
        message: 'Error al actualizar usuario: '+error.message,
        data: undefined,
      };
    }
    return response;
  }

  // async deleteUser(id: number): Promise<ResponseDto<undefined>> {
  //   let response: ResponseDto<undefined>;
  //   try {

  //     const user = await this.prisma.user.findUnique({
  //       where: { id },
  //     });
  //     if (!user) {
  //       response = {
  //         status: 404,
  //         message: 'Usuario no encontrado',
  //         data: undefined,
  //       };
  //       return response;
  //     }

  //     await this.prisma.user.delete({
  //       where: { id },
  //     });
  //     response = {
  //       status: 200,
  //       message: 'Usuario eliminado con éxito',
  //       data: undefined,
  //     };
  //   } catch (error) {
  //     this.logger.error('Error al eliminar usuario: ', error.message);
  //     response = {
  //       status: 500,
  //       message: 'Error al eliminar usuario: '+error.message,
  //       data: undefined,
  //     };
  //   }
  //   return response;
  // }
}
