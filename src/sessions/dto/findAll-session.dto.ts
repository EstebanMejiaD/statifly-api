import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FindAllSessionDto {

  @ApiProperty({ description: 'ID del usuario que realizó la sesión' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ description: 'ID del deporte asociado a la sesión' })
  @IsString()
  @IsNotEmpty()
  sportId!: string;
}
