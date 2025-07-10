import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AllowedRoles } from '../../decorators/allowed-roles.decorator';
import { TokenAuthGuard } from '../../guard/token-auth.guard';
import { RoleBasedGuard } from '../../guard/role-based.guard';
import { ID } from '../../infrastructure/types.global';
import { SearchUserDto } from './dto/search-user.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UserProfile } from './schema/user-profile.schema';
import { UsersService } from './users.service';

@Controller('api/users')
@UseGuards(TokenAuthGuard, RoleBasedGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @AllowedRoles('admin', 'manager')
  searchUsers(
    @Query() filters: Partial<SearchUserDto>,
  ): Promise<UserProfile[]> {
    return this.userService.findAll(filters);
  }

  @Put(':id')
  @AllowedRoles('admin')
  assignRole(
    @Param('id') userId: ID,
    @Body() updateData: AssignRoleDto,
  ): Promise<UserProfile> {
    return this.userService.updateRole(userId, updateData.role);
  }
}