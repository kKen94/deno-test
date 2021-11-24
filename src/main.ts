import { Drash, log, PaladinService, CSRFService, DexterService } from '../deps.ts';
import { TestController } from './controllers/test-controller.ts';

const SERVER = {
  PORT: Deno.env.get('DENO_HOSTNAME') ? 80 : 1447,
  HOSTNAME: Deno.env.get('DENO_HOSTNAME') ?? 'localhost',
};

const serverStart = () => {
  log.info(`Server start on port ${SERVER.HOSTNAME}:${SERVER.PORT}`);
}
// const serverError = (error: any) => {
//   log.error(error);
// }

const server = new Drash.Server({
  hostname: SERVER.HOSTNAME,
  port: SERVER.PORT,
  resources: [TestController],
  protocol: 'http',
  services: [
    new PaladinService(),
    new CSRFService(),
    new DexterService(),
  ],
});

server.run();
serverStart();
