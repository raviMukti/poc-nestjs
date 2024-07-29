import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    public readonly healthCheckService: HealthCheckService,
    public readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get('readiness')
  readiness() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('mysqlConnection'),
    ]);
  }
}
