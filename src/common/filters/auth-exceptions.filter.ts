import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from '../dto/response.dto';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthExceptionsFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException | ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    let status = 401;
    let message = 'No estás autorizado';

    if (exception instanceof ForbiddenException) {
      status = 403;
      message = 'No tienes permisos para acceder a este recurso';
    }

    const response: ResponseDto<null> = {
      status,
      message,
      data: null,
    };

    res.status(status).json(response);
  }
}
