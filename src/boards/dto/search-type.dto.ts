import { IsNotEmpty, IsString } from 'class-validator';


export class SearchTypeDto {
    readonly type: "title" | "content" | "author" | "titleAndName";
}