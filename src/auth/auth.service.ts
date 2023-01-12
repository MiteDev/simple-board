import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository) { }

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        const { password } = createUserDto
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(password, salt);

        await this.authRepository.createUser(createUserDto);
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        const { username, password } = signInDto;
        const userData = await this.authRepository.login(username)

        if(userData[0] && (await bcrypt.compare(password, userData[0].password))) {
            return "login Success"
        } else {
            throw new UnauthorizedException('signIn Failed');
        }
    }
}
