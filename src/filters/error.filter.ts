import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.NOT_FOUND) {
        return response.render('404', {Notfooter: true});
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        if (process.env.NODE_ENV === 'production') {
            return response.render('500', {Notfooter: true});
        }
        else {
          let message = error.stack;
          return response.status(status).send(message);
        }
    }
  }
}