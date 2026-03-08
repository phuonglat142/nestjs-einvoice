import { Logger } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsString, validateSync } from 'class-validator';

export class BaseConfiguration {
  @IsString()
  NODE_ENV: string;

  @IsBoolean()
  iS_DEV: boolean;

  @IsString()
  @IsNotEmpty()
  GLOBA_PREFIX: string;

  constructor() {
    this.NODE_ENV = process.env['NODE_ENV'] || 'development';
    this.iS_DEV = this.NODE_ENV === 'development';
    this.GLOBA_PREFIX = process.env['GLOBA_PREFIX'] || 'api/v1';
  }

  validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      const _errors = errors.map((error) => {
        return error.children;
      });

      Logger.error(_errors, errors);

      throw new Error('Configuration is invalid');
    }
  }
}
