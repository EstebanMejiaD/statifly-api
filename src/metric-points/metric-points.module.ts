import { Module } from '@nestjs/common';
import { MetricPointsService } from './metric-points.service';
import { MetricPointsController } from './metric-points.controller';

@Module({
  controllers: [MetricPointsController],
  providers: [MetricPointsService],
})
export class MetricPointsModule {}
