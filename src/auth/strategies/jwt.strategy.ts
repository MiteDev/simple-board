import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../auth.entity";
import { AuthRepository } from "../auth.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        protected configService: ConfigService,
        private authRepository: AuthRepository
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req.cookies.jwt.accessToken;
                }
            ])
        })
    }

    async validate(payload): Promise<User> {
        const { id } = payload;
        const user: User = await this.authRepository.getOneUser(id);
        console.log(user)
        return user;
    }
}