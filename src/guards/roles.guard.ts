import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return matchRoles(roles, user.roles);
  }
}

const matchRoles = (contextRoles: any, userRoles: any): boolean => {
  /**
   * @TODO implement this function to check if the user has the right roles
   */

  return false;
};
