import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-admin')
  async registerAdmin(@Body() dto: RegisterDto) {
    return this.authService.register(dto, 'admin');
  }

  @Post('register-teacher')
  async registerTeacher(@Body() dto: RegisterDto) {
    return this.authService.register(dto, 'teacher');
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
