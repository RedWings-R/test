import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

const matchRoles = (roles_, roles) => {
  return roles_.some((role) => roles?.includes(role));
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext):Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return matchRoles(roles, user.roles.map(role_ => role_.role));
  }
}