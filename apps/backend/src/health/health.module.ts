import { Module } from '@nestjs/common';
import { HealthController } from './interfaces/rest/health.controller';
import { MysqlModule } from '@wms-monorepo/shared';
import { TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';

@Module({
  imports: [
    MysqlModule,
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [TypeOrmHealthIndicator, HealthCheckExecutor],
})
export class HealthModule {}
