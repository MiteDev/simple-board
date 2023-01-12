import { BadRequestException, PipeTransform } from "@nestjs/common";
import { Board, BoardStatus } from "../boards.entity";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the Status Option`);
        }

        return value;
    }

    private isStatusValid(status: BoardStatus) {
        const index = this.StatusOptions.indexOf(status);
        
        return index !== -1
    }
}