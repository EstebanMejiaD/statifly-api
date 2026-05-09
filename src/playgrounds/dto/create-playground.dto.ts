import { ApiProperty } from '@nestjs/swagger';
import { PlaygroundType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';


export class CoordinateDto {
  @IsNumber()
  lat!: number;

  @IsNumber()
  lng!: number;
}

export class DimensionDto {
  @IsNumber()
  length!: number;

  @IsNumber()
  width!: number;

  @IsString()
  unit!: string;
}


export class CreatePlaygroundDto {
  @ApiProperty({ description: 'Nombre del campo de juego' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'ID del deporte asociado al campo de juego' })
  @IsString()
  @IsNotEmpty()
  sportId!: string;

  @ApiProperty({ description: 'Tipo de campo de juego' })
  @IsString()
  @IsOptional()
  type?: PlaygroundType;

  @ApiProperty({ type: [CoordinateDto], description: 'Coordenadas del campo de juego' })
  @ValidateNested({ each: true })
  @Type(() => CoordinateDto)
  coordinates!: CoordinateDto[];

  @ApiProperty({ type: DimensionDto, description: 'Dimensiones del campo de juego' })
  @ValidateNested()
  @Type(() => DimensionDto)
  dimensions?: DimensionDto;

  @ApiProperty({ description: 'ID del usuario que creó el campo de juego' })
  @IsString()
  @IsNotEmpty()
  createdBy!: string;
}
