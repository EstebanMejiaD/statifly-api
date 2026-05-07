import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SportsModule } from './sports/sports.module';
import { SessionsModule } from './sessions/sessions.module';
import { MetricPointsModule } from './metric-points/metric-points.module';

@Module({
  imports: [UsersModule, PrismaModule, SportsModule, SessionsModule, MetricPointsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
