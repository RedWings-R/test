import {BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../role/entity/role.entity';
import { Vehicule } from '../../vehicule/entities/vehicule.entity';
import { Historique } from '../../historique/entities/historique.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  login: string;

  @Column({select: false})
  @IsNotEmpty()
  passwd: string;

  @Column()
  @IsNotEmpty()
  nom: string;

  @Column()
  @IsNotEmpty()
  prenom: string;

  @Column()
  @IsEmail()
  mail: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(()=> Vehicule, vehicule => vehicule.user)
  vehicule:Vehicule;

  @ManyToMany(()=> Role, role => role.users,{cascade:true})
  @JoinTable()
  roles:Role[];

  @BeforeInsert()
  async hashPassword() {
    this.passwd = await bcrypt.hash(this.passwd, 8);
  }

  async validatePassword(passwd: string): Promise<boolean> {
    return await bcrypt.compare(passwd, this.passwd);
  }
}
