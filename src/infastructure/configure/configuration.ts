import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Configuration {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    const value =
      this.configService.get<string>('PORT') ??
      this.configService.get<string>('port') ??
      '3000';
    const port = Number(value);

    if (Number.isNaN(port)) {
      throw new Error('Invalid port value in environment configuration');
    }

    return port;
  }
}
