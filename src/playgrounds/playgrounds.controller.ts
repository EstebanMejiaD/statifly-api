import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PlaygroundsService } from './playgrounds.service';
import { CreatePlaygroundDto } from './dto/create-playground.dto';
import { UpdatePlaygroundDto } from './dto/update-playground.dto';
import { Response } from 'express';
import { FindAllPlaygroundDto } from './dto/findAll-playground.dto';

@Controller('playgrounds')
export class PlaygroundsController {
  constructor(private readonly playgroundsService: PlaygroundsService) {}

  @Post()
  async create(@Body() createPlaygroundDto: CreatePlaygroundDto, @Res() res: Response) {
    const response = await this.playgroundsService.create(createPlaygroundDto);
    return res.status(response.status).json(response);
  }

  @Get()
  async findAll(@Body() findAllPlaygroundDto: FindAllPlaygroundDto, @Res() res: Response) {
    const response = await this.playgroundsService.findAll(findAllPlaygroundDto);
    return res.status(response.status).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response = await this.playgroundsService.findOne(id);
    return res.status(response.status).json(response);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaygroundDto: UpdatePlaygroundDto, @Res() res: Response) {
    const response = await this.playgroundsService.update(id, updatePlaygroundDto);
    return res.status(response.status).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = await this.playgroundsService.remove(id);
    return res.status(response.status).json(response);
  }
}
