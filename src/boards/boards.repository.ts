import { Injectable } from "@nestjs/common";
import { FieldPacket, RowDataPacket, ResultSetHeader, OkPacket } from "mysql2";
import { DatabaseService } from "src/database/database.service";
import { Board } from "./boards.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from '../boards/boards.entity'
import { User } from "src/auth/auth.entity";
import { SearchTypeDto } from "./dto/search-type.dto";

interface Boards extends Board, RowDataPacket { }

@Injectable()
export class BoardsRepository {
    constructor(
        private databaseService: DatabaseService
    ) { }

    async findAll(): Promise<Boards[]> {
        const queryString = `SELECT * FROM boards`;
        const [rows, _]: [Boards[], FieldPacket[]] = await this.databaseService.db.query(queryString);
        return rows;
    }

    async create(param: CreateBoardDto, user: User): Promise<ResultSetHeader> {
        const queryString = `INSERT INTO boards (title, content, status, account_num) VALUES (?, ?, ?, ?)`;
        const [rows, _]: [ResultSetHeader, FieldPacket[]] = await this.databaseService.db.query(queryString, [param.title, param.title, param.status, user.account_num])

        return rows;
    }

    async find(name: string, type: SearchTypeDto): Promise<Board[]> {
        console.log(type);
        const queryString = `SELECT A.name, B.title, B.content, B.createAt, B.board_num
        FROM account A
        INNER JOIN boards B
        ON A.account_num = B.account_num
        WHERE A.name = ? AND B.status != 'PRIVATE'
        ORDER BY B.createAt DESC`;

        const [rows, _]: [Boards[], FieldPacket[]] = await this.databaseService.db.query(queryString, name);

        return rows;
    }

    async getOneBoardByID(id: number): Promise<Board[]> {
        const queryString = `SELECT * FROM boards WHERE board_num = ?`;

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