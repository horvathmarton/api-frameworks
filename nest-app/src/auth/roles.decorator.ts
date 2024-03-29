import { SetMetadata } from '@nestjs/common';
import { Role as RoleType } from '../types';

export const Role = (role: RoleType) => SetMetadata('role', role);
