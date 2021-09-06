import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,){} 

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user_ = await this.userRepository.save(createUserDto).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });

    delete user_.passwd;
    return user_;
  }

  async getAll(): Promise<User[]> {
    const users_ = await this.userRepository.find().catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    users_.forEach(element => {
      delete element.passwd;
    });
    return users_;
  }

  async getOne(id: number,user:User): Promise<User> {
    const role = user.roles.find(x => x.role==='admin');
    
    let user_ = await User.findOne(id,{relations: ['roles']}).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if((user_ != undefined && user.id === user_.id) || role){
      return user_;
    }else{
      throw new UnauthorizedException("Unauthorized");
    }
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({where:{login: login},relations: ['roles'],select:["id","login","passwd","nom","prenom"]}).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
  }

  async update(id: number, createUserDto: CreateUserDto,user:User):Promise<User> {
    const role = user.roles.find(x => x.role==='admin');

    let user_ = await this.userRepository.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if((user_ != undefined && user.id === user_.id) || role){
      
      user_.login = createUserDto.login;
      user_.nom = createUserDto.nom;
      user_.prenom = createUserDto.prenom;
      user_.mail = createUserDto.mail;
      user_.roles = createUserDto.roles;

      if(createUserDto.password != undefined){
         user_.passwd = await bcrypt.hash(createUserDto.password, 8);
      }
      user_ = await this.userRepository.save(user_).catch((err) => {
        throw new HttpException(err,HttpStatus.BAD_REQUEST);
      });

      delete user_.passwd
      return user_;
    }else{
      throw new UnauthorizedException("Unauthorized");
    }    
  }

  async remove(id: number): Promise<User> {
    if(id === 1){
      throw new UnauthorizedException('Unable to delete this user !')
    }else{
      const user = this.userRepository.findOne(id);
      if(user){
        return this.userRepository.delete(id).then((rslt) => {
          if(rslt.affected){
            return user;
          }else{
            throw new HttpException('Error delete on this user',HttpStatus.EXPECTATION_FAILED);
          }
        });
      }else{
        throw new HttpException('User not found',HttpStatus.NOT_FOUND);
      }
    }
  }

}
