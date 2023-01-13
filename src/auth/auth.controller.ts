import { Body, Controller, HttpCode, Post, Req, Res, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { SignInDto } from './dtos/sign-in.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    @HttpCode(200)
    async signup(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<Boolean> {
        return await this.authService.signUp(createUserDto);
    }

    @Post('signin')
    async signin(
        @Body(ValidationPipe) signInDto: SignInDto,
        @Res() res: Response
    ) {
        const token = await this.authService.signIn(signInDto);
        console.log(token);
        res.setHeader('Authorization', `Bearer ${token.accessToken}`);
        res.cookie('jwt', token.accessToken, {
            httpOnly: true,
            maxAge: 60 * 30
        });

        return res.send({ success: true })
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user);
    }
}
