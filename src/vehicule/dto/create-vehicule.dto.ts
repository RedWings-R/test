import { User } from "../../users/entity/user.entity";
import { Historique } from "../../historique/entities/historique.entity";

export class CreateVehiculeDto {
    marque:string;
    modele:string;
    immatriculation:string;
    kilometre:number;
    historiques:Historique[];
    user:User;
}
