import { User } from "../../users/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar',{unique:true,length:50})
    role:string;

    @ManyToMany(()=> User,user => user.roles)
    users:User[];
}