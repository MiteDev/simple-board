import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './boards.repository';
import { User } from 'src/auth/auth.entity';
import { SearchTypeDto } from './dto/search-type.dto';

@Injectable()
export class BoardsService {
    constructor(
        private boardsRepository: BoardsRepository
    ) { }

    async getAllBoards(): Promise<Board[]> {
        const data = await this.boardsRepository.findAll();

        return data;
    }

    async createBoard(param: CreateBoardDto,  user: User): Promise<void> {
        if(param.status) { }
        else param.status = BoardStatus.PUBLIC;
        
        await this.boardsRepository.create(param, user)
            .catch(err => { throw err });
    }

    async getBoardByTypeAndName(name: string, type: SearchTypeDto): Promise<Board[]> {
        const data = await this.boardsRepository.find(name, type)
            .catch(err => { throw err });
        if (!data.length) throw new NotFoundException(`Can't find Board with userName ${name}`);

        return data;
    }

    async getOneBoardById(id: number): Promise<Board[]> {
        const data = await this.boardsRepository.getOneBoardByID(id);

        return data;
    }

    async deleteBoardById(id: number): Promise<void> {
        const result = await this.boardsRepository.deleteBoardById(id)
            .catch(err => { throw err });

        if (result.affectedRows === 0) throw new NotFoundException(`Can't find Board with id ${id}`)
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<void> {
        const result = await this.boardsRepository.updateBoardStatus(id, status)
            .catch(err => { throw err });

        if (result.affectedRows === 0) throw new NotFoundException(`Can't find Board with id ${id}`)
    }
}
