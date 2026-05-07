import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FindAllMetricPointDto {

  @ApiProperty({ description: 'ID de la sesión a la que pertenece el punto métrico' })
  @IsString()
  @IsNotEmpty()
  sessionId!: string;

}
