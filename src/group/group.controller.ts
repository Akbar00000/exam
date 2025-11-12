import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupController {
  constructor(private svc: GroupService) {}

  @Post()
  create(@Req() req, @Body('name') name: string) {
    return this.svc.create(name, req.user.sub);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }
}
