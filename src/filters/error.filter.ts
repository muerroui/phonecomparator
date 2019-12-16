import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.NOT_FOUND) {
        return response.status(404).render('custom/404', {Notfooter: true});
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        if (process.env.NODE_ENV === 'production') {
            return response.render('custom/500', {Notfooter: true});
        }
        else {
          return response.status(status).send(error.stack);
        }
    }
  }
}