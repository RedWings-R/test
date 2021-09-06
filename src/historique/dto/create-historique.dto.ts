import { User } from "../../users/entity/user.entity";
import { Vehicule } from "../../vehicule/entities/vehicule.entity";

export class CreateHistoriqueDto {
    kilometre:number;
    date:Date;
    vehicule:Vehicule;
    user:User;
}