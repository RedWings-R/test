import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Vehicule } from '../vehicule/entities/vehicule.entity';
import { Repository } from 'typeorm';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
import { Historique } from './entities/historique.entity';

@Injectable()
export class HistoriqueService {
  constructor(@InjectRepository(Historique) private readonly historiqueRepository: Repository<Historique>,
              @InjectRepository(Vehicule) private readonly vehiculeRepository: Repository<Vehicule>,){}

  async create(createHistoriqueDto: CreateHistoriqueDto,user:User):Promise<Historique> {
    const role = user.roles.find(x => x.role==='admin');
    if(createHistoriqueDto.vehicule){
      let vehicule_ = await this.vehiculeRepository.findOne(createHistoriqueDto.vehicule,{relations:['user']}).catch((err) => {
        throw new HttpException(err,HttpStatus.BAD_REQUEST);
      });
      if(vehicule_){
        if((vehicule_.user && vehicule_.user.id === user.id) || role){
          return await this.historiqueRepository.save(createHistoriqueDto).catch((err) => {
            throw new HttpException(err,HttpStatus.BAD_REQUEST);
          });
        }else{
            throw new UnauthorizedException("Unauthorized");
        }
      }else{
        throw new HttpException("Vehicule not found",HttpStatus.NOT_FOUND); 
      }
    }else{
      throw new HttpException("No vehicule found on your query",HttpStatus.BAD_REQUEST);
    }
  }

  async findAll():Promise<Historique[]> {
    return await this.historiqueRepository.find().catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
  }

  async findAllByVehicule(id: number):Promise<Historique[]> {
    return await this.historiqueRepository.find({where: {vehicule:id}}).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
  }

  async findOne(id: number,user:User):Promise<Historique> {
    const role = user.roles.find(x => x.role==='admin');
    let histo = await this.historiqueRepository.findOne(id,{relations:['vehicule','vehicule.user']}).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if(histo){
      if((histo.vehicule.user && histo.vehicule.user.id === user.id) || role){
        delete histo.vehicule
        return histo;
      }else{
        throw new UnauthorizedException("Unauthorized");
      }      
    }else{
      throw new HttpException("Historique not found",HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateHistoriqueDto: UpdateHistoriqueDto,user:User):Promise<Historique> {
    const role = user.roles.find(x => x.role==='admin');
    let histo = await this.historiqueRepository.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });

    if(histo){
      if((histo.vehicule.user && histo.vehicule.user.id === user.id) || role){
        histo.kilometre = updateHistoriqueDto.kilometre;
        histo.date = updateHistoriqueDto.date;
        return await this.historiqueRepository.save(histo).catch((err) => {
          throw new HttpException(err,HttpStatus.BAD_REQUEST);
        });
      }else{
        throw new UnauthorizedException("Unauthorized");
      }      
    }else{
      throw new HttpException("Historique not found",HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number):Promise<Historique> {
    let histo = await this.historiqueRepository.findOne(id).catch((err) => {
      throw new HttpException(err,HttpStatus.BAD_REQUEST);
    });
    if(histo){
      let rslt = await this.historiqueRepository.delete(id);
      if(rslt.affected){
        return histo;
      }else{
        throw new HttpException("Historique not deleted",HttpStatus.EXPECTATION_FAILED);
      }
    }else{
      throw new HttpException("Historique not found",HttpStatus.NOT_FOUND);
    }
    
  }
}
