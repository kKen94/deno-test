import { Controller, Get, QueryParam, v4, Status } from '../../deps.ts';
import { HttpException } from '../utils/exceptions/mod.ts';

@Controller('/tests')
export class TestController {
  @Get()
  all(@QueryParam('id') id: string) {
    if (id) {
      if (!v4.validate(id)) {
        return new HttpException(Status.NotAcceptable, `Id ${id} param not in uuid v4 format`)
      }
      return `Id by query param ${id}`;
    }
    return 'No one id found, sending back all table';
  }

  @Get('/:id')
  single(id: string) {
    if (!v4.validate(id)) {
      return new HttpException(Status.NotAcceptable, `Id ${id} param not in uuid v4 format`)
    }
    return `Id by path param ${id}`;
  }
}
