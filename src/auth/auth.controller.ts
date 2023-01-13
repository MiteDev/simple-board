import { Body, Controller, HttpCode, Get, Post, Req, Res, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { User } from './auth.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SignInDto } from './dto/sign-in.dto';

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
        res.setHeader('Authorization', `Bearer ${token.accessToken}`);
        res.cookie('jwt', token, {
            maxAge: 1000*60*30,
            httpOnly: true
        });
        return res.send({ success: true })
    }

    @Post('/signout')
    @UseGuards(AuthGuard())
    async signout(
        @Res() res: Response
    ) {
        res.clearCookie('jwt');
        res.send({success: true});
    }
}
