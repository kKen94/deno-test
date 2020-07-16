import { Drash, v4 } from '../../deps.ts';

export class TestController extends Drash.Http.Resource {
  static paths = [
    '/tests',
    '/tests/:id',
  ];

  public GET() {
    let userId = this.request.getUrlQueryParam("id");
    if (userId) {
      if (!v4.validate(userId)) {
        return new Drash.Exceptions.HttpException(406, `Id ${userId} param not in uuid v4 format`);
      }
      this.response.body = `Id by query param ${userId}`;
      return this.response;
    }
    userId = this.request.getPathParam('id');
    if (userId) {
      if (!v4.validate(userId)) {
        return new Drash.Exceptions.HttpException(406, `Id ${userId} param not in uuid v4 format`);
      }
      this.response.body = `Id by path param ${userId}`;
      return this.response;
    }
    this.response.body = 'No one id found, sending back all table';
    return this.response;
  }

  public POST() {
    const body = this.request.body;

    this.response.body = "POST request received!";
    return this.response;
  }

  public PUT() {
    this.response.body = "PUT request received!";
    return this.response;
  }

  public DELETE() {
    this.response.body = "DELETE request received!";
    return this.response;
  }

}
