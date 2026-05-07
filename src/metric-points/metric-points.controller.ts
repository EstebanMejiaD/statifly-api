import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { MetricPointsService } from './metric-points.service';
import { CreateMetricPointDto } from './dto/create-metric-point.dto';
import { UpdateMetricPointDto } from './dto/update-metric-point.dto';
import { JwtAuthGuard, RolesGuard } from 'src/common';
import { Response } from 'express';
import { FindAllMetricPointDto } from './dto/findAll-metric-point.dto';
import { CreateManyMetricPointsDto } from './dto/create-many-metric-points.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('metric-points')
export class MetricPointsController {
  constructor(private readonly metricPointsService: MetricPointsService) {}

  @Post(':sessionId')
  async create(@Param('sessionId') sessionId: string, @Body() createMetricPointDto: CreateMetricPointDto, @Res() res: Response) {
    const response = await this.metricPointsService.create(sessionId, createMetricPointDto);
    res.status(response.status).json(response);
  }

@Post(':sessionId/bulk')
createMany(
  @Param('sessionId') sessionId: string,
  @Body() body: CreateManyMetricPointsDto,
) {
  return this.metricPointsService.createManyBySessionId(
    sessionId,
    body.metrics,
  );
}

  @Get()
  async findAll(@Body() findAllMetricPointDto: FindAllMetricPointDto, @Res() res: Response) {
    const response = await this.metricPointsService.findAll(findAllMetricPointDto);
    res.status(response.status).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response = await this.metricPointsService.findOne(id);
    res.status(response.status).json(response);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMetricPointDto: UpdateMetricPointDto, @Res() res: Response) {
    const response = await this.metricPointsService.update(id, updateMetricPointDto);
    res.status(response.status).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = await this.metricPointsService.remove(id);
    res.status(response.status).json(response);
  }
}
