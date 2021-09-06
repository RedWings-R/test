import { Vehicule } from "../../vehicule/entities/vehicule.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entity/user.entity";

@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    kilometre:number;

    @Column()
    date:Date;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @ManyToOne(()=> Vehicule, vehicule => vehicule.historiques,{cascade:true})
    @JoinColumn()
    vehicule:Vehicule;
}