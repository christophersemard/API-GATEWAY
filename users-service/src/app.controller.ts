import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'get_hello' })
  public async hello(): Promise<string> {
    return 'Hello World!';
  }
}
