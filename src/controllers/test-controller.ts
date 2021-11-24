import { Drash, v4 } from '../../deps.ts';

export class TestController extends Drash.Resource {
  public paths = [
    '/tests',
    '/tests/:id',
  ];

  public GET(request: Drash.Request, response: Drash.Response) {
    let userId = request.queryParam("id");
    if (userId) {
      if (!v4.validate(userId)) {
        return new Drash.Errors.HttpError(406, `Id ${userId} param not in uuid v4 format`);
      }
      response.body = `Id by query param ${userId}`;
      return response;
    }
    userId = request.pathParam('id');
    if (userId) {
      if (!v4.validate(userId)) {
        return new Drash.Errors.HttpError(406, `Id ${userId} param not in uuid v4 format`);
      }
      response.body = `Id by path param ${userId}`;
      return response;
    }
    response.body = 'No one id found, sending back all table';
    return response;
  }

  public POST(request: Drash.Request, response: Drash.Response) {
    const body = request.body;

    response.body = "POST request received!";
    return response;
  }

  public PUT(request: Drash.Request, response: Drash.Response) {
    response.body = "PUT request received!";
    return response;
  }

  public DELETE(request: Drash.Request, response: Drash.Response) {
    response.body = "DELETE request received!";
    return response;
  }

}
