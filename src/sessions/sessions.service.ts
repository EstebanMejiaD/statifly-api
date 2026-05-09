import { Injectable, Logger } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { FindAllSessionDto } from './dto/findAll-session.dto';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto) {
    let response: ResponseDto<any>;
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: createSessionDto.userId },
      });
      if (!user) {
        response = {
          status: 404,
          message: 'Usuario no encontrado',
          data: undefined,
        };
        return response;
      }

      const sport = await this.prisma.sport.findUnique({
        where: { id: createSessionDto.sportId },
      });
      if (!sport) {
        response = {
          status: 404,
          message: 'Deporte no encontrado',
          data: undefined,
        };
        return response;
      }

      const playground = await this.prisma.playground.findUnique({
        where: { id: createSessionDto.playgroundId },
      });
      if (!playground) {
        response = {
          status: 404,
          message: 'Campo de juego no encontrado',
          data: undefined,
        };
        return response;
      }

      const session = await this.prisma.session.create({
        data: createSessionDto,
      });
      response = {
        status: 201,
        message: 'Sesión creada con éxito',
        data: session,
      };
    } catch (error) {
      this.logger.error('Error al crear sesión', error);
      response = {
        status: 500,
        message: 'Error al crear sesión',
        data: undefined,
      };
    }
    return response;
  }

  async findAll(findAllSessionDto: FindAllSessionDto) {
    let response: ResponseDto<any>;
    try {
      const sessions = await this.prisma.session.findMany({
        where: {
          userId: findAllSessionDto.userId,
          sportId: findAllSessionDto.sportId,
        },
      });

      if (sessions.length === 0) {
        response = {
          status: 404,
          message: 'No se encontraron sesiones',
          data: undefined,
        };
        return response;
      }
      response = {
        status: 200,
        message: 'Sesiones obtenidas con éxito',
        data: sessions,
      };
    } catch (error) {
      this.logger.error('Error al obtener todas las sesiones', error);
      response = {
        status: 500,
        message: 'Error al obtener todas las sesiones',
        data: undefined,
      };
    }
    return response;
  }

  async findOne(id: string, findAllSessionDto: FindAllSessionDto) {
    let response: ResponseDto<any>;
    try {
      const session = await this.prisma.session.findFirst({
        where: {
          id: id,
          userId: findAllSessionDto.userId,
          sportId: findAllSessionDto.sportId,
        },
      });
      if (!session) {
        response = {
          status: 404,
          message: 'Sesión no encontrada',
          data: undefined,
        };
        return response;
      }
      response = {
        status: 200,
        message: 'Sesión obtenida con éxito',
        data: session,
      };
    } catch (error) {
      this.logger.error('Error al obtener la sesión', error);
      response = {
        status: 500,
        message: 'Error al obtener la sesión',
        data: undefined,
      };
    }
    return response;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    let response: ResponseDto<any>;
    try {
      const { startTime, maxSpeed, endTime, duration, distance, avgSpeed } =
        updateSessionDto;
      const session = await this.prisma.session.findUnique({
        where: { id },
      });

      if (!session) {
        response = {
          status: 404,
          message: 'Sesión no encontrada',
          data: undefined,
        };
        return response;
      }

      const updatedSession = await this.prisma.session.update({
        where: { id },
        data: {
          startTime: startTime ?? session.startTime,
          endTime: endTime ?? session.endTime,
          duration: duration ?? session.duration,
          distance: distance ?? session.distance,
          maxSpeed: maxSpeed ?? session.maxSpeed,
          avgSpeed: avgSpeed ?? session.avgSpeed,
        },
      });

      response = {
        status: 200,
        message: 'Sesión actualizada con éxito',
        data: updatedSession,
      };
    } catch (error) {
      this.logger.error('Error al actualizar la sesión', error);
      response = {
        status: 500,
        message: 'Error al actualizar la sesión',
        data: undefined,
      };
    }
    return response;
  }

  async remove(id: string) {
    let response: ResponseDto<any>;
    try {
      const session = await this.prisma.session.findUnique({
        where: { id },
      });
      if (!session) {
        response = {
          status: 404,
          message: 'Sesión no encontrada',
          data: undefined,
        };
        return response;
      }

      await this.prisma.session.delete({
        where: { id },
      });

      response = {
        status: 200,
        message: 'Sesión eliminada con éxito',
        data: undefined,
      };
    } catch (error) {
      this.logger.error('Error al eliminar la sesión', error);
      response = {
        status: 500,
        message: 'Error al eliminar la sesión',
        data: undefined,
      };
    }
    return response;
  }
}
