import { Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeController } from './vehicule.controller';
import { Vehicule } from './entities/vehicule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicule]),UsersModule],
  controllers: [VehiculeController],
  providers: [VehiculeService]
})
export class VehiculeModule {}
