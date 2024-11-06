import { Module } from '@nestjs/common';
import { UserManagementController } from './user-management.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [UserManagementController],
})
export class UserManagementModule {}
