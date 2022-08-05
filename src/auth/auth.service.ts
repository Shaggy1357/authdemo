import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto } from '../user/dtos/CreateUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dtos/authLogin.dto';

@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService:JwtService){}

    async login(authLoginDto:AuthLoginDto){
        const user = await this.validateUser(authLoginDto);
        const payload = {
            userId:user.id,
        };
        return{
            access_token:this.jwtService.sign(payload),
        };
    }

    async validateUser(authLoginDto:AuthLoginDto):Promise<UserEntity>{
        // const {email,password} = authLoginDto;
        const user = await this.userService.finByEmail(authLoginDto.email);
        // console.log(user);
        if(!(await user?.validatepassword(authLoginDto.password))){
            throw new UnauthorizedException();
        }
        return user;
    }
}
