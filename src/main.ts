import { App, log } from '../deps.ts';
import { TestArea } from './areas/mod.ts';

const SERVER = {
  PORT: Deno.env.get('DENO_HOSTNAME') ? 80 : 1447,
  HOSTNAME: Deno.env.get('DENO_HOSTNAME') ?? 'localhost',
};
const serverStart = () => {
  log.info(`Server start on port ${SERVER.HOSTNAME}:${SERVER.PORT}`);
}
const serverError = (error: any) => {
  log.error(error);
}
// const dexter = Dexter({
//   enabled: true,
//   response_time: true,
//   tag_string: '{level} | {request_method} {request_url} | {datetime} | ',
//   tag_string_fns: {
//     datetime() {
//       return new Date().toISOString().replace('T', ' ').split('.')[0];
//     },
//   }
// });
//
// const paladin = Paladin();
//
// const server = new Drash.Http.Server({
//   response_output: 'text/plain',
//   resources: [TestController],
//   middleware: {
//     before_request: [dexter],
//     after_request: [
//       dexter,
//       paladin,
//     ],
//   },
// });
//
// server.run({
//   hostname: SERVER.HOSTNAME,
//   port: SERVER.PORT,
// }).then(serverStart, serverError);

const app = new App({
  areas: [TestArea],
  logging: true,
});

await app.listen(`http://${SERVER.HOSTNAME}:${SERVER.PORT}`);
