import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService
        ) { }

    async signUp(createUserDto: CreateUserDto): Promise<Boolean> {
        const { password } = createUserDto;
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(password, salt);

        await this.authRepository.createUser(createUserDto);
        return true;
    }

    async signIn(signInDto: SignInDto): Promise<{accessToken: string}> {
        const { email, password } = signInDto;
        const userData = await this.authRepository.login(email)

        if(userData[0] && (await bcrypt.compare(password, userData[0].password))) {
            const payload = {
                id: userData[0].account_num
            };
            const accessToken = await this.jwtService.sign(payload);
            console.log(accessToken)
            return {accessToken: accessToken}
        } else {
            throw new UnauthorizedException('signIn Failed');
        }
    }
}
