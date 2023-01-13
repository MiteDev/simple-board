import { Body, Controller, Delete, Get, Param, Post, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/auth.entity';
import { Board, BoardStatus } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { GetUser } from 'src/auth/get-user.decorator';
import { SearchTypeDto } from './dto/search-type.dto';

@Controller('boards')
export class BoardsController {
    constructor(
        private boardsService: BoardsService,
    ) { }

    @Get()
    @UseGuards(AuthGuard())
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe({ transform: true }))
    createBoard(
        @Body() body: CreateBoardDto,
        @GetUser() user: User
    ) {
        return this.boardsService.createBoard(body, user);
    }

    @Get('search/:type/:name')
    @UsePipes(new ValidationPipe({transform: true}))
    getBoardByName(
        @Param('name') name: string, 
        @Param('type') type: SearchTypeDto
    ) {
        console.log(typeof type);
        return this.boardsService.getBoardByTypeAndName(name, type);
    }

    @Get(':id')
    getOneBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board[]>{
        return this.boardsService.getOneBoardById(id);
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
