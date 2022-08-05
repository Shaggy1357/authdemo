import { Inject } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/authLogin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private authService:AuthService){}

    @Post()
    async login(@Body() authLoginDto:AuthLoginDto){
        return this.authService.login(authLoginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async test(){
        return "Success!";
    }
}
