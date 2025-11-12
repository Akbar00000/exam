import { Controller, Get } from '@nestjs/common';
import { MurojatService } from './murojat.service';
import { Murojat } from './murojat.entity';

@Controller('murojat')
export class MurojatController {
  constructor(private readonly murojatService: MurojatService) {}

  @Get()
  async findAll(): Promise<Murojat[]> {
    return this.murojatService.findAll();
  }
}
