import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('overview')
  async getOverview() {
    return this.statsService.getOverview();
  }

  @Get('monthly')//monthly?year=2024
  async getMonthly(@Query('year') year: number) {
    return this.statsService.getMonthlyStats(Number(year));
  }
}
