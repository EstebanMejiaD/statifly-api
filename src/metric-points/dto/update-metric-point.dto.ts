import { PartialType } from '@nestjs/swagger';
import { CreateMetricPointDto } from './create-metric-point.dto';

export class UpdateMetricPointDto extends PartialType(CreateMetricPointDto) {
    sessionId?: string;
}
