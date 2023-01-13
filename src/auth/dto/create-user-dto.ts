import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { SignInDto } from './sign-in.dto';

export class CreateUserDto extends SignInDto {    
    @IsNotEmpty()
    @IsString()
    name: string;
}