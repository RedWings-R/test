import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { CreateHistoriqueDto } from './dto/create-historique.dto';
import { UpdateHistoriqueDto } from './dto/update-historique.dto';
import { UserDeco } from '../auth/user.decorator';
import { User } from '../users/entity/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Historique } from './entities/historique.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/role.guard';

@UseGuards(JwtAuthGuard)
@Controller('historique')
export class HistoriqueController {
  constructor(private readonly historiqueService: HistoriqueService) {}

  @Post()
  create(@Body() createHistoriqueDto: CreateHistoriqueDto,@UserDeco() user:User):Promise<Historique> {
    return this.historiqueService.create(createHistoriqueDto,user);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get()
  findAll():Promise<Historique[]> {
    return this.historiqueService.findAll();
  }
  
  @Get('/vehicule/:id')
  findAllByVehicule(@Param('id') id: number,@UserDeco() user:User):Promise<Historique[]> {
    return this.historiqueService.findAllByVehicule(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@UserDeco() user:User):Promise<Historique> {
    return this.historiqueService.findOne(+id,user);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateHistoriqueDto: UpdateHistoriqueDto,@UserDeco() user:User):Promise<Historique> {
    return this.historiqueService.update(+id, updateHistoriqueDto,user);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string):Promise<Historique> {
    return this.historiqueService.remove(+id);
  }
}
