import { Injectable } from "@nestjs/common";
import { FieldPacket, RowDataPacket, ResultSetHeader, OkPacket } from "mysql2";
import { DatabaseService } from "src/database/database.service";
import { Board } from "./boards.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from '../boards/boards.entity'

interface Boards extends Board, RowDataPacket { }

@Injectable()
export class BoardsRepository {
    constructor(
        private databaseService: DatabaseService
    ) { }

    async findAll(): Promise<Boards[]> {
        const queryString = `SELECt * FROM boards`;
        const [rows, _]: [Boards[], FieldPacket[]] = await this.databaseService.db.query(queryString);
        return rows;
    }

    async create(param: CreateBoardDto): Promise<ResultSetHeader> {
        const queryString = `INSERT INTO boards (title, description, status) VALUES (?, ?, ?)`;
        const [rows, _]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.db.query(queryString, [param.title, param.description, param.status])

        return rows;
    }

    async findOne(id: number): Promise<Board[]> {
        const queryString = `SELECT * FROM boards WHERE id = ?`;
        const [rows, _]: [Boards[], FieldPacket[]] = await this.databaseService.db.query(queryString, id);

        return rows;
    }

    async deleteBoardById(id: number): Promise<ResultSetHeader> {
        const queryString = `DELETE FROM boards WHERE id = ?`;
        const [rows, _]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.db.query(queryString, id);

        return rows;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<ResultSetHeader> {
        const queryString = `UPDATE boards SET status = ? WHERE id = ?`;
        const [rows, _]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.db.query(queryString, [status, id]);
        return rows;
    }
}