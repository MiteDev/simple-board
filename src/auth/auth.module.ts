import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    DatabaseService,
    AuthRepository
  ]
})
export class AuthModule {}
