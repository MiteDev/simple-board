import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './boards.repository';

@Injectable()
export class BoardsService {
    constructor(
        private boardsRepository: BoardsRepository
    ) { }

    async getAllBoards(): Promise<Board[]> {
        const data = await this.boardsRepository.findAll();

        return data;
    }

    async createBoard(param: CreateBoardDto): Promise<void> {
        const board = {
            title: param.title,
            description: param.description,
            status: BoardStatus.PUBLIC
        }

        await this.boardsRepository.create(board)
            .catch(err => { throw err });
    }

    async getBoardById(id: number): Promise<Board[]> {
        const data = await this.boardsRepository.findOne(id)
            .catch(err => { throw err });
        if (!data.length) throw new NotFoundException(`Can't find Board with id ${id}`);

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
