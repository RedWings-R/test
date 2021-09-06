import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/entity/user.entity';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { UserDeco } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('/admin')
  async testAdmin(@UserDeco() user:User) {
    return 'Success! \nuserId :'+user.id+'\nisAdmin : True';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async testUser(@UserDeco() user:User) {
    return 'Success! \nuserId :'+user.id+'\nUser : False';
  }
}