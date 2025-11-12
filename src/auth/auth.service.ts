import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto, role: 'admin' | 'teacher') {
    const exist = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exist) throw new UnauthorizedException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({ ...dto, password: hashed, role });
    await this.userRepo.save(user);

    return { message: 'User registered', id: user.id, role: user.role };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET',
      expiresIn: '1h',
    });

    return { access_token, role: user.role };
  }
}
