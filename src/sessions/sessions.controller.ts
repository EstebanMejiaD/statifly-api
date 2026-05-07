import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Response } from 'express';
import { find } from 'rxjs';
import { FindAllSessionDto } from './dto/findAll-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto, @Res() res: Response) {
    const response = await this.sessionsService.create(createSessionDto);
    res.status(response.status).json(response);
  }

  @Get()
  async findAll(@Body() findAllSessionDto: FindAllSessionDto, @Res() res: Response) {
    const response = await this.sessionsService.findAll(findAllSessionDto);
    res.status(response.status).json(response);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response, @Body() findAllSessionDto: FindAllSessionDto) {
    const response = await this.sessionsService.findOne(id, findAllSessionDto);
    res.status(response.status).json(response);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto, @Res() res: Response) {
    const response = await this.sessionsService.update(id, updateSessionDto);
    res.status(response.status).json(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const response = await this.sessionsService.remove(id);
    res.status(response.status).json(response);
  }
}
