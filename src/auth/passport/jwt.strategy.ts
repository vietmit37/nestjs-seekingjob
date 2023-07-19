import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN'),
        });
    }

    async validate(payload: any): Promise<any> {
        return { userId: payload.sub, username: payload.username };
    }
}