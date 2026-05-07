import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SportsModule } from './sports/sports.module';

@Module({
  imports: [UsersModule, PrismaModule, SportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
