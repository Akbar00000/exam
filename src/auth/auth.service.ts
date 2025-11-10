import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // REGISTER
  async register(dto: RegisterDto) {
    const exist = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exist) throw new UnauthorizedException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

   
    const role: 'admin' | 'teacher' | 'student' =  dto.role ?? 'student';

    const user = this.userRepo.create({
      email: dto.email,
      password: hashed,
      role: role, 
    });

    await this.userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user);
    user.refreshToken = tokens.refresh_token;
    await this.userRepo.save(user);

    return {tokens, role: user.role};
  }

  // TOKENS
  private async generateTokens(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'ACCESS_SECRET',
      expiresIn: '15m',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  // REFRESH TOKEN
  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'REFRESH_SECRET',
      });

      const user = await this.userRepo.findOne({ where: { id: payload.id } });
      if (!user || user.refreshToken !== refreshToken)
        throw new UnauthorizedException('Invalid refresh token');

      const tokens = await this.generateTokens(user);
      user.refreshToken = tokens.refresh_token;
      await this.userRepo.save(user);
      return tokens;
    } catch {
      throw new UnauthorizedException('Refresh failed');
    }
  }

  // FORGOT PASSWORD
  async forgotPassword(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const code = randomInt(100000, 999999).toString();
    user.resetCode = code;
    await this.userRepo.save(user);

    return { message: 'Reset code sent to your email', code };
  }

  // RESET PASSWORD
  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user || user.resetCode !== code)
      throw new BadRequestException('Invalid reset code');

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetCode = undefined;
    await this.userRepo.save(user);

    return { message: 'Password reset successful' };
  }
}
