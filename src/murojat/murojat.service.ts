import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Murojat } from './murojat.entity';

@Injectable()
export class MurojatService {
  constructor(
    @InjectRepository(Murojat)
    private murojatRepo: Repository<Murojat>,
  ) {}

  async findAll(): Promise<Murojat[]> {
    return this.murojatRepo.find();
  }
}
