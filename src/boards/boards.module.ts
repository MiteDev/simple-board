import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseService } from 'src/database/database.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    DatabaseService,
    BoardsRepository,
    JwtService
  ]
})
export class BoardsModule {}
