import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidRoles } from '../interfaces/valid-roles';
import {  RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/use-role/use-role.guard';

export function Auth(...roles: ValidRoles[]) {
  console.log({roles})
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard(), UserRoleGuard)
  );
}