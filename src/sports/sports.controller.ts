import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Response } from 'express';
import { JwtAuthGuard, RolesGuard } from 'src/common';

@UseGuards(JwtAuthGuard, RolesGuard)
//@Roles(Role.ADMIN)
@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Post()
  async create(@Body() createSportDto: CreateSportDto, @Res() res: Response) {
    const response = await this.sportsService.create(createSportDto);
    res.status(response.status).json(response);
  }

  @Get()
  async findAll() {
    return await this.sportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sportsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSportDto: CreateSportDto) {
    return await this.sportsService.update(id, updateSportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.sportsService.remove(id);
  }
}
