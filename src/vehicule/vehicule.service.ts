import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Vehicule } from './entities/vehicule.entity';

@Injectable()
export class VehiculeService {
  constructor(@InjectRepository(Vehicule) private readonly vehiculeRepository: Repository<Vehicule>,){}

  async create(createVehiculeDto: CreateVehiculeDto):Promise<Vehicule> {
    return await this.vehiculeRepository.save(createVehiculeDto).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
  }

  async findAll():Promise<Vehicule[]> {
    return await this.vehiculeRepository.find().catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
  }

  async findOne(id: number,user:User):Promise<Vehicule> {
    const role = user.roles.find(x => x.role==='admin')
    let vehicule_ = await this.vehiculeRepository.findOne(id,{relations:['user']}).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if(vehicule_){
      if((vehicule_.user && vehicule_.user.id === user.id) || role){
        return vehicule_;
      }else{
        throw new UnauthorizedException("Unauthorized");
      }    
    }else{
      throw new HttpException("Vehicule not found",HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateVehiculeDto: UpdateVehiculeDto,user:User):Promise<Vehicule> {

    let vehicule_ = await this.vehiculeRepository.findOne(id,{relations:['user']}).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });

    if(!vehicule_){
      throw new HttpException("Vehicule not found",HttpStatus.NOT_FOUND);
    }

    vehicule_.user = updateVehiculeDto.user
    vehicule_.immatriculation = updateVehiculeDto.immatriculation;
    vehicule_.kilometre = updateVehiculeDto.kilometre;
    vehicule_.marque = updateVehiculeDto.marque;
    vehicule_.modele = updateVehiculeDto.modele;
    vehicule_.historiques = updateVehiculeDto.historiques;

    return await this.vehiculeRepository.save(vehicule_).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
  }

  async remove(id: number):Promise<Vehicule> {
    let vehicule_ = await this.vehiculeRepository.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if(vehicule_){
      let rslt = await this.vehiculeRepository.delete(id);
      if(rslt.affected){
        return vehicule_;
      }else{
        throw new HttpException("Vehicule not deleted",HttpStatus.EXPECTATION_FAILED);
      }
    }else{
      throw new HttpException("Vehicule not found",HttpStatus.NOT_FOUND);
    }
  }
}
