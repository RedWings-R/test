export interface Config{
    USER:User;
    ROLE:Role;
}

interface User{
    login:string;
    passwd:string;
    nom:string;
    prenom:string;
    mail:string;
}

interface Role{
    role:string;
}