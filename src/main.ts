import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthExceptionsFilter } from './common/filters/auth-exceptions.filter';
import { envs } from './config';

async function bootstrap() {


  const logger = new Logger('Main-Statifly-API');
  const app = await NestFactory.create(AppModule);
  

  app.setGlobalPrefix('api/v1');

  const configSwagger = new DocumentBuilder()
    .setTitle('Statifly-API')
    .setDescription('API for Statifly application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/v1/docs', app, documentFactory());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });


  //Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );  

  //Filters
  app.useGlobalFilters(new AuthExceptionsFilter());
  

  await app.listen(envs.port);
  logger.log(`Statifly-API is running on port: ${envs.port}`);

}
bootstrap();
