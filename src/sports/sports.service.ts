import { Injectable, Logger } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SportsService {

  private readonly logger = new Logger(SportsService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createSportDto: CreateSportDto) {
    let response: ResponseDto<any>;
    try {
      
      const sport = await this.prisma.sport.findUnique({
        where: { name: createSportDto.name},        
      })


      if (sport !== null) {
        response = {
          status: 400,
          message: 'Ya existe un deporte con ese nombre',
          data: undefined,
        };
        return response;
      } 

      const newSport = await this.prisma.sport.create({
        data: createSportDto,
      })
      
      response = {
        status: 201,
        message: 'Deporte creado con éxito',
        data: newSport,
      }


    } catch (error) {
      this.logger.error('Error al crear deporte', error);
      response = {
        status: 500,
        message: 'Error al crear deporte',
        data: undefined,
      };
    }
    return response;
  }

  async findAll() {
    let response: ResponseDto<any>;
    try {
      const sports = await this.prisma.sport.findMany();
      if (sports.length === 0) {
        response = {
          status: 404,
          message: 'No se encontraron deportes',
          data: undefined,
        };
        return response;
      }
      response = {
        status: 200,
        message: 'Deportes obtenidos con éxito',
        data: sports,
      };
    } catch (error) {
      this.logger.error('Error al obtener deportes', error);
      response = {
        status: 500,
        message: 'Error al obtener deportes',
        data: undefined,
      };
    }

    return response;
  }

  async findOne(id: string) {
    let response: ResponseDto<any>;
    try {
      const sport = await this.prisma.sport.findUnique({
        where: { id },
      });
      if (!sport) {
        response = {
          status: 404,
          message: 'Deporte no encontrado',
          data: undefined,
        };
        return response;
      }
      response = {
        status: 200,
        message: 'Deporte obtenido con éxito',
        data: sport,
      };
    } catch (error) {
      this.logger.error('Error al obtener deporte', error);
      response = {
        status: 500,
        message: 'Error al obtener deporte',
        data: undefined,
      };
    }
    return response;
  }

  async update(id: string, updateSportDto: UpdateSportDto) {
    let response: ResponseDto<any>;
    try {

      if (updateSportDto.name === undefined || updateSportDto.name.trim() === '') {
        response = {
          status: 400,
          message: 'El nombre del deporte es obligatorio',
          data: undefined,
        };
        return response;
      }
      const sport = await this.prisma.sport.findUnique({
        where: { id },
      });
      if (!sport) {
        response = {
          status: 404,
          message: 'Deporte no encontrado',
          data: undefined,
        };
        return response;
      }

      const existingSportWithName = await this.prisma.sport.findUnique({
        where: { name: updateSportDto.name },
      });
      if (existingSportWithName && existingSportWithName.id !== id) {
        response = {
          status: 400,
          message: 'Ya existe un deporte con ese nombre',
          data: undefined,
        };
        return response;
      }
      const updatedSport = await this.prisma.sport.update({
        where: { id },
        data: updateSportDto,
      });
      response = {
        status: 200,
        message: 'Deporte actualizado con éxito',
        data: updatedSport,
      };
    } catch (error) {
      this.logger.error('Error al actualizar deporte', error);
      response = {
        status: 500,
        message: 'Error al actualizar deporte',
        data: undefined,
      };
    }
    return response;
  }
  

  async remove(id: string) {
    let response: ResponseDto<any>;
    try {
      const sport = await this.prisma.sport.findUnique({
        where: { id },
      });
      if (!sport) {
        response = {
          status: 404,
          message: 'Deporte no encontrado',
          data: undefined,
        };
        return response;
      }
      await this.prisma.sport.delete({
        where: { id },
      });
      response = {
        status: 200,
        message: 'Deporte eliminado con éxito',
        data: undefined,
      };
    } catch (error) {
      this.logger.error('Error al eliminar deporte', error);
      response = {
        status: 500,
        message: 'Error al eliminar deporte',
        data: undefined,
      };
    }
    return response;
  }
}
