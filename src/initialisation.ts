import { getRepository } from "typeorm";
import { Role } from "./role/entity/role.entity";
import { User } from "./users/entity/user.entity";

export async function init() {
  let config = JSON.parse(process.env.CONF)
  getRepository(User) 
  .createQueryBuilder() 
  .getMany()
  .then((users) => {
    if(users.length === 0){
      getRepository(User)
      .createQueryBuilder('admin')
      .insert()
      .into(User)
      .values([
        { login: config.USER.login, passwd: config.USER.passwd, nom:  config.USER.nom, prenom: config.USER.prenom, mail: config.USER.mail}
      ])
      .execute().catch((err) =>{console.log(1,err);});
    }
  }).catch((err) =>{console.log(2,err);});

  getRepository(Role) 
  .createQueryBuilder() 
  .getMany()
  .then((role) => {
    if(role.length === 0){
      getRepository(Role)
      .createQueryBuilder('admin')
      .insert()
      .into(Role)
      .values([
        { role: config.ROLE.role }
      ])
      .execute().catch((err) =>{console.log(1,err);});
    }
  }).catch((err) =>{console.log(2,err);});
}