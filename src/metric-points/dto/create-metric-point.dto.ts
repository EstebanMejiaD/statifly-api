import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMetricPointDto {

  @ApiProperty({ description: 'Timestamp del punto métrico' })
  @IsNumber()
  @IsNotEmpty()
  timestamp!:number;      // epoch (como tu JSON) foramt:  1714400000

  @ApiProperty({ description: 'Latitud del punto métrico' })
  @IsNumber()
  @IsNotEmpty()
  lat!:number;

  @ApiProperty({ description: 'Longitud del punto métrico' })
  @IsNumber()
  @IsNotEmpty()
  lng!:number;

  @ApiProperty({ description: 'Velocidad del punto métrico' })
  @IsNumber()
  @IsNotEmpty()
  speed!:number;

  @ApiProperty({ description: 'Aceleración del punto métrico' })
  @IsNumber()
  @IsNotEmpty()
  acceleration!:number;

  @ApiProperty({ description: 'Aceleración en el eje X' })
  @IsNumber()
  @IsNotEmpty()
  gx!:number;

  @ApiProperty({ description: 'Aceleración en el eje Y' })
  @IsNumber()
  @IsNotEmpty()
  gy!:number;

  @ApiProperty({ description: 'Aceleración en el eje Z' })
  @IsNumber()
  @IsNotEmpty()
  gz!:number;

}
