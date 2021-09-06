import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { CreateVehiculeDto } from './dto/create-vehicule.dto';
import { UpdateVehiculeDto } from './dto/update-vehicule.dto';
import { Vehicule } from './entities/vehicule.entity';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { UserDeco } from '../auth/user.decorator';
import { User } from '../users/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('vehicule')
export class VehiculeController {
  constructor(private readonly vehiculeService: VehiculeService) {}

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createVehiculeDto: CreateVehiculeDto):Promise<Vehicule> {
    return this.vehiculeService.create(createVehiculeDto).catch((err) => {
      console.log(err)
      throw "errr";
    });
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  findAll():Promise<Vehicule[]> {
    return this.vehiculeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number,@UserDeco() user:User):Promise<Vehicule> {
    return this.vehiculeService.findOne(id,user);
  }
  
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateVehiculeDto: UpdateVehiculeDto,@UserDeco() user:User,):Promise<Vehicule> {
    return this.vehiculeService.update(id, updateVehiculeDto, user);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number):Promise<Vehicule> {
    return this.vehiculeService.remove(id);
  }
}
