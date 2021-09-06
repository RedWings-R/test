import { Module } from '@nestjs/common';
import { HistoriqueService } from './historique.service';
import { HistoriqueController } from './historique.controller';
import { Historique } from './entities/historique.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Vehicule } from '../vehicule/entities/vehicule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Historique,Vehicule]),UsersModule],
  controllers: [HistoriqueController],
  providers: [HistoriqueService]
})
export class HistoriqueModule {}
