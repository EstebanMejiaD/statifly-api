import {
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { CreateMetricPointDto } from './create-metric-point.dto';

export class CreateManyMetricPointsDto {
  @IsArray()
  @ArrayMinSize(1)

  @ValidateNested({ each: true })

  @Type(() => CreateMetricPointDto)

  metrics!: CreateMetricPointDto[];
}