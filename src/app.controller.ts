import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Multstand DB Server is running! 🚀';
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'multstand-server-db',
    };
  }
} 