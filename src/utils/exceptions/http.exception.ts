import { Status, STATUS_TEXT } from '../../../deps.ts';

export class HttpException extends Error {
  constructor(status: Status, message: string) {
    super(message);
    this.name = 'HttpException';
    this.statusCode = status;
    this.statusText = STATUS_TEXT.get(status);
  }
}
