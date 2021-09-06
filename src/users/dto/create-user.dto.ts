import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Vehicule } from 'src/vehicule/entities/vehicule.entity';
import { Role } from '../../role/entity/role.entity';

export class CreateUserDto {
  @ApiProperty()
  login: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  mail: string;
  @ApiProperty()
  roles:Role[];
  vehicule:Vehicule;
}
