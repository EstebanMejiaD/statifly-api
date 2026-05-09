import { Injectable, Logger } from '@nestjs/common';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllPlaygroundDto } from './dto/findAll-playground.dto';
@Injectable()
export class PlaygroundsService {
  private response: ResponseDto<any> = {
    status: 200,
    message: '',
    data: undefined,
  };

  private readonly logger = new Logger(PlaygroundsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPlaygroundDto: CreatePlaygroundDto) {
    try {
      const sport = await this.prisma.sport.findUnique({
        where: { id: createPlaygroundDto.sportId },
      });

      if (!sport) {
        this.response = {
          status: 404,
          message: 'Deporte no encontrado',
          data: undefined,
        };
        return this.response;
      }

      const creator = await this.prisma.user.findUnique({
        where: { id: createPlaygroundDto.createdBy },
      });

      if (!creator) {
        this.response = {
          status: 404,
          message: 'Usuario no encontrado',
          data: undefined,
        };
        return this.response;
      }

      const playground = await this.prisma.playground.create({
        data: {
          name: createPlaygroundDto.name,
          sportId: createPlaygroundDto.sportId,
          type: createPlaygroundDto.type,

          coordinates:
            createPlaygroundDto.coordinates as unknown as Prisma.InputJsonValue,

          dimensions:
            createPlaygroundDto.dimensions as unknown as Prisma.InputJsonValue,

          createdBy: createPlaygroundDto.createdBy,
        },
      });

      this.response = {
        status: 201,
        message: 'Campo de juego creado con éxito',
        data: playground,
      };
    } catch (error) {
      this.logger.error('Error al crear el campo de juego', error);
      this.response = {
        status: 500,
        message: 'Error al crear el campo de juego',
        data: undefined,
      };
    }

    return this.response;
  }

  async findAll(findAllPlaygroundDto: FindAllPlaygroundDto) {
    try {
      const playgrounds = await this.prisma.playground.findMany({
        where: {
          createdBy: findAllPlaygroundDto.userId,
          sportId: findAllPlaygroundDto.sportId,
        },
      });
      if (playgrounds.length === 0) {
        this.response = {
          status: 404,
          message: 'No se encontraron campos de juego',
          data: undefined,
        };
        return this.response;
      }

      this.response = {
        status: 200,
        message: 'Campos de juego obtenidos con éxito',
        data: playgrounds,
      };
    } catch (error) {
      this.logger.error('Error al obtener todos los campos de juego', error);
      this.response = {
        status: 500,
        message: 'Error al obtener todos los campos de juego',
        data: undefined,
      };
    }
    return this.response;
  }

  async findOne(id: string) {
    const playground = await this.prisma.playground.findUnique({
      where: { id },
    });
    if (!playground) {
      this.response = {
        status: 404,
        message: 'Campo de juego no encontrado',
        data: undefined,
      };
      return this.response;
    }
    this.response = {
      status: 200,
      message: 'Campo de juego obtenido con éxito',
      data: playground,
    };
    return this.response;
  }

  async update(id: string, updatePlaygroundDto: UpdatePlaygroundDto) {
    const playground = await this.prisma.playground.findUnique({
      where: { id },
    });
    if (!playground) {
      this.response = {
        status: 404,
        message: 'Campo de juego no encontrado',
        data: undefined,
      };
      return this.response;
    }
    const updatedPlayground = await this.prisma.playground.update({
      where: { id },
      data: {
        name: updatePlaygroundDto.name,
        sportId: updatePlaygroundDto.sportId,
        type: updatePlaygroundDto.type,
        coordinates:
          updatePlaygroundDto.coordinates as unknown as Prisma.InputJsonValue,
        dimensions:
          updatePlaygroundDto.dimensions as unknown as Prisma.InputJsonValue,
        createdBy: updatePlaygroundDto.createdBy,
      },
    });
    this.response = {
      status: 200,
      message: 'Campo de juego actualizado con éxito',
      data: updatedPlayground,
    };
    return this.response;
  }

  async remove(id: string) {
    const playground = await this.prisma.playground.findUnique({
      where: { id },
    });
    if (!playground) {
      this.response = {
        status: 404,
        message: 'Campo de juego no encontrado',
        data: undefined,
      };
      return this.response;
    }
    await this.prisma.playground.delete({
      where: { id },
    });
    this.response = {
      status: 200,
      message: 'Campo de juego eliminado con éxito',
      data: undefined,
    };
    return this.response;
  }
}
