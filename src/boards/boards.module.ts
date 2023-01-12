import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';
import { BoardsService } from './boards.service';

@Module({
  controllers: [BoardsController],
  providers: [
    BoardsService,
    DatabaseService,
    BoardsRepository
  ]
})
export class BoardsModule {}
