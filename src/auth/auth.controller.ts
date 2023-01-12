import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<void> {
        return this.authService.signUp(createUserDto)
    }

    @Post('signin')
    signin(
        @Body(ValidationPipe) signInDto: SignInDto
    ) {
        return this.authService.signIn(signInDto);
    }
}
