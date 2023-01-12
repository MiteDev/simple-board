import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { Board, BoardStatus } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService
    ) { }

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createBoard(
        @Body() body: CreateBoardDto
    ) {
        return this.boardsService.createBoard(body);
    }

    @Get(':id')
    getBoardById(@Param('id', ParseIntPipe) id: number) {
        return this.boardsService.getBoardById(id)
    }

    @Delete(':id')
    deleteBoardById(@Param('id', ParseIntPipe) id: number) {
        return this.boardsService.deleteBoardById(id);
    }

    @Patch(':id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status)
    }
}
