import { RowDataPacket } from "mysql2";

export interface Board {
    id?: number;
    title: string;
    description: string;
    status: BoardStatus
}

export interface BoardWithUser extends Board, RowDataPacket { }

export enum BoardStatus {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}