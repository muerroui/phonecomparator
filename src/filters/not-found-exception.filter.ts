import * as path from 'path';
import { ExceptionFilter, Catch, NotFoundException, Render } from '@nestjs/common';
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
@Render('404')
  catch(exception: NotFoundException, response) {
    response.render('404', {Notfooter: true});
  }
}
