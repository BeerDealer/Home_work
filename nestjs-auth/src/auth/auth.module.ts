import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
