import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

//here we have a custom decorator that is composing multiple other decorators using the method @applyDecorators
export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

// fake code just for avoid errors
const AuthGuard = null;
const RolesGuard = null;
const ApiBearerAuth = null;
const ApiUnauthorizedResponse = null;
