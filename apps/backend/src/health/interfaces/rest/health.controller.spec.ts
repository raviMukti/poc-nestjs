/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule,
      ],
      controllers: [HealthController],
      providers: [
        TypeOrmHealthIndicator,
        HealthCheckExecutor,
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // It Should Return Up Health Check
  it('GET /health/liveness should return ok', async () => {
    // Fake DB Connection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(controller.typeOrmHealthIndicator, 'pingCheck').mockImplementation(() => Promise.resolve('up') as any);
    const res = await controller.readiness();

    expect(res.status).toEqual("ok");
  });

});
