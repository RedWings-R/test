import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus, HttpException, Put, Delete, Res } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entity/user.entity';
import { Response } from 'express';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/role.guard';
import { UserDeco } from '../auth/user.decorator';
import { ApiBody } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  async getAll():Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number,@UserDeco() user:User):Promise<User> {
    return this.usersService.getOne(id,user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createUserDto: CreateUserDto,@UserDeco() user:User):Promise<User> {
    return this.usersService.update(id, createUserDto,user);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<User> {
    return this.usersService.remove(id);
  }
}
