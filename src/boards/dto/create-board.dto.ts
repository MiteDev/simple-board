import { IsEmpty, IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../boards.entity';

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
    
    status?: BoardStatus;
}