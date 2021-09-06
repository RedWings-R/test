import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const payload = {
      id: user.id,
      roles: user.roles,
    };
    
    delete user.passwd;
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { login, passwd } = authLoginDto;

    const user = await this.usersService.findByLogin(login).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if (!(await user?.validatePassword(passwd))) {
      throw new UnauthorizedException();
    }
    return user;
  }
}