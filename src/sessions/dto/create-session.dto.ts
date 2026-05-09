import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateSessionDto {

  @ApiProperty({ description: 'ID del usuario que realizó la sesión' })
  @IsString()
  @IsNotEmpty()
  userId!:string;

  @ApiProperty({ description: 'ID del deporte asociado a la sesión' })
  @IsString()
  @IsNotEmpty()
  sportId!:string;

  @ApiProperty({ description: 'ID del campo de juego asociado a la sesión' })
  @IsString()
  @IsNotEmpty()
  playgroundId!:string;  

  @ApiProperty({ description: 'Nombre de la sesión' })
  @IsString()
  @IsNotEmpty()
  name!:string;

  @ApiProperty({ description: 'Descripción de la sesión' })
  @IsString()
  @IsOptional()
  description?:string;  

  @ApiProperty({ description: 'Fecha y hora de inicio de la sesión' })
  @IsNotEmpty()
  startTime!:Date;

  @ApiProperty({ description: 'Fecha y hora de finalización de la sesión' })
  @IsNotEmpty()
  endTime!:Date;

  @ApiProperty({ description: 'Duración de la sesión en segundos' })
  @IsNumber()
  @IsNotEmpty()
  duration!:number;// seconds

  @ApiProperty({ description: 'Distancia recorrida en la sesión' })
  @IsNumber()
  distance!:number;

  @ApiProperty({ description: 'Velocidad máxima alcanzada en la sesión' })
  @IsNumber()
  maxSpeed!:number;

  @ApiProperty({ description: 'Velocidad promedio en la sesión' })
  @IsNumber()
  avgSpeed!:number;

  @ApiProperty({ description: 'Datos adicionales de la sesión' })
  @IsOptional()
  additionalData?: Object;
}
