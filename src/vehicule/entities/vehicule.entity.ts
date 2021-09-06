import { Historique } from "../../historique/entities/historique.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entity/user.entity";

@Entity()
export class Vehicule {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    marque:string;

    @Column()
    modele:string;

    @Column()
    immatriculation:string;

    @Column()
    kilometre:number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(()=> User, user => user.vehicule)
    @JoinColumn()
    user:User;

    @OneToMany(()=> Historique, historique => historique.vehicule)
    historiques:Historique[];
}