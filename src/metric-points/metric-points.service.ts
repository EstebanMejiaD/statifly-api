import { Injectable, Logger } from '@nestjs/common';
import { CreateMetricPointDto } from './dto/create-metric-point.dto';
import { UpdateMetricPointDto } from './dto/update-metric-point.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllMetricPointDto } from './dto/findAll-metric-point.dto';

@Injectable()
export class MetricPointsService {

  private readonly logger = new Logger(MetricPointsService.name);
  
  constructor(private readonly prisma: PrismaService) {}

  async create(sessionId:string, createMetricPointDto: CreateMetricPointDto) {
    let response: ResponseDto<any>;
    try {
      
      const session = await this.prisma.session.findUnique({
        where: { id: sessionId },
      })

      if (!session) {
        response = {
          status: 404,
          message: 'Sesión no encontrada',
          data: undefined,
        };
        return response;
      }
      const metricPoint = await this.prisma.metricPoint.create({
        data: {
          ...createMetricPointDto,
          sessionId,
        },
      })  

      response = {
        status: 201,
        message: 'Punto métrico creado con éxito',
        data: metricPoint,
      }

    } catch (error) {
      this.logger.error('Error al crear punto métrico', error);
      response = {
        status: 500,
        message: 'Error al crear punto métrico',
        data: undefined,
      };
    }
    return response;
  
  }

async createManyBySessionId(
  sessionId: string,
  metricPoints: CreateMetricPointDto[],
) {
  try {
    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) {
      return {
        status: 404,
        message: 'Sesión no encontrada',
        data: undefined,
      };
    }

    const data = metricPoints.map((metric) => ({
      sessionId,
      timestamp: metric.timestamp,
      lat: metric.lat,
      lng: metric.lng,
      speed: metric.speed,
      acceleration: metric.acceleration,
      gx: metric.gx,
      gy: metric.gy,
      gz: metric.gz,
    }));

    const result = await this.prisma.metricPoint.createMany({
      data,
    });

    return {
      status: 201,
      message: 'Puntos métricos creados con éxito',
      data: {
        inserted: result.count,
      },
    };
  } catch (error: any) {
    this.logger.error(
      'Error creating metric points batch',
      error,
    );

    return {
      status: 500,
      message: 'Error al crear puntos métricos',
      data: undefined,
    };
  }
} 

  async findAll(findAllMetricPointDto: FindAllMetricPointDto) {
    let response: ResponseDto<any>;
    try {
      const metricPoints = await this.prisma.metricPoint.findMany({
        where: { sessionId: findAllMetricPointDto.sessionId },
      });
      if (metricPoints.length === 0) {
        response = {
          status: 404,
          message: 'No se encontraron puntos métricos para la session especificada',
          data: undefined,
        };
        return response;
      }
      response = {
        status: 200,
        message: 'Puntos métricos encontrados con éxito',
        data: metricPoints,
      };
    } catch (error) {
      this.logger.error('Error al obtener puntos métricos', error);
      response = {
        status: 500,
        message: 'Error al obtener puntos métricos',
        data: undefined,
      };
    }
    return response;
  }

  async findOne(id: string) {
    let response: ResponseDto<any>;
    try {
      const metricPoint = await this.prisma.metricPoint.findUnique({
        where: { id },
      });
      if (!metricPoint) {
        response = {
          status: 404,
          message: 'Punto métrico no encontrado',
          data: undefined,
        };
        return response;
      }
      response = {
        status: 200,
        message: 'Punto métrico encontrado con éxito',
        data: metricPoint,
      };
    } catch (error) {
      this.logger.error('Error al obtener punto métrico', error);
      response = {
        status: 500,
        message: 'Error al obtener punto métrico',
        data: undefined,
      };
    }
    return response;
  }

  async update(id: string, updateMetricPointDto: UpdateMetricPointDto) {
      let response: ResponseDto<any>;
      try {
        const metricPointWithoutSessionId = { ...updateMetricPointDto };
        delete metricPointWithoutSessionId.sessionId;
        const metricPoint = await this.prisma.metricPoint.findUnique({
          where: { id },
        });
        if (!metricPoint) {
          response = {
            status: 404,
            message: 'Punto métrico no encontrado',
            data: undefined,
          };
          return response;
        }
        const updatedMetricPoint = await this.prisma.metricPoint.update({
          where: { id },
          data: metricPointWithoutSessionId,
        });
        response = {
          status: 200,
          message: 'Punto métrico actualizado con éxito',
          data: updatedMetricPoint,
        };
      } catch (error) {
        this.logger.error('Error al actualizar punto métrico', error);
        response = {
          status: 500,
          message: 'Error al actualizar punto métrico',
          data: undefined,
        };
      }
      return response;
    }

  async remove(id: string) {
    let response: ResponseDto<any>;
    try {
      const metricPoint = await this.prisma.metricPoint.findUnique({
        where: { id },
      });
      if (!metricPoint) {
        response = {
          status: 404,
          message: 'Punto métrico no encontrado',
          data: undefined,
        };
        return response;
      }
      await this.prisma.metricPoint.delete({
        where: { id },
      });
      response = {
        status: 200,
        message: 'Punto métrico eliminado con éxito',
        data: undefined,
      };
    } catch (error) {
      this.logger.error('Error al eliminar punto métrico', error);
      response = {
        status: 500,
        message: 'Error al eliminar punto métrico',
        data: undefined,
      };
    }
    return response;
  }
}
