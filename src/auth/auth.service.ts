import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUser(username)
        if (user) {
            const isValid = this.userService.IsValidPassword(pass, user.password)
            if (isValid) {
                return user
            }
        }
        // if (user && user.password === pass) {
        //     const { password, ...result } = user
        //     return result
        // }
        return null
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
