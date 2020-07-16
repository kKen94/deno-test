import { Dexter, Drash, log } from '../deps.ts';
import { TestController } from './controllers/test-controller.ts';

const SERVER = {
  PORT: 1447,
  HOSTNAME: 'localhost',
};
const serverStart = () => {
  log.info(`Server start on port ${SERVER.HOSTNAME}:${SERVER.PORT}`);
}
const serverError = (error: any) => {
  log.error(error);
}
const dexter = Dexter({
  enabled: true,
  response_time: true,
  tag_string: '{level} | {request_method} {request_url} | {datetime} | ',
  tag_string_fns: {
    datetime() {
      return new Date().toISOString().replace('T', ' ').split('.')[0];
    },
  }
});

const server = new Drash.Http.Server({
  response_output: 'text/plain',
  resources: [TestController],
  middleware: {
    before_request: [dexter],
    after_request: [dexter],
  },
});

server.run({
  hostname: SERVER.HOSTNAME,
  port: SERVER.PORT,
}).then(serverStart, serverError);
