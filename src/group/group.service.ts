import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private groupRepo: Repository<Group>) {}

  async create(name: string, createdById: number) {
    const group = this.groupRepo.create({ name, createdById });
    return this.groupRepo.save(group);
  }

  async findAll() {
    return this.groupRepo.find();
  }
}
  