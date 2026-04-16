import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Configuration {
  constructor(private readonly configService: ConfigService) {}

  private getValue(key: string, fallback?: string): string {
    const value = this.configService.get<string>(key);

    if (value !== undefined && value !== null && value !== '') {
      return value;
    }

    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error(`Missing required environment variable: ${key}`);
  }

  private getNumberValue(key: string, fallback?: number): number {
    const rawValue = this.getValue(key, fallback?.toString());
    const parsedValue = Number(rawValue);

    if (Number.isNaN(parsedValue)) {
      throw new Error(`Invalid numeric environment variable: ${key}`);
    }

    return parsedValue;
  }

  get port(): number {
    return this.getNumberValue('PORT', 3000);
  }

  get databaseHost(): string {
    return this.getValue('DB_HOST', 'localhost');
  }

  get databasePort(): number {
    return this.getNumberValue('DB_PORT', 5432);
  }

  get databaseUsername(): string {
    return this.getValue('DB_USERNAME');
  }

  get databasePassword(): string {
    return this.getValue('DB_PASSWORD');
  }

  get databaseName(): string {
    return this.getValue('DB_NAME');
  }

  get databaseSynchronize(): boolean {
    const value = this.getValue('DB_SYNCHRONIZE', 'true').toLowerCase();
    return value === 'true';
  }
}
