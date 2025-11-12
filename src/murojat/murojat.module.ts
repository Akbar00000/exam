import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Murojat } from './murojat.entity';
import { MurojatService } from './murojat.service';
import { MurojatController } from './murojat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Murojat])],
  providers: [MurojatService],
  controllers: [MurojatController],
  exports: [TypeOrmModule], 
})
export class MurojatModule {}
