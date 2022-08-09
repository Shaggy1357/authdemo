import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserEntity } from './entities/user.entity';
// var base64 = require('base-64');
// var utf8 = require('utf8');
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>,
    private mailService:MailerService){}

    async create(createUserDto:CreateUserDto):Promise<CreateUserDto>{
        const user1 = this.userRepo.findOne({
            where:{
                email:createUserDto.email
            }
        })
        if(user1){
            throw new BadRequestException("User Already exists!");
        }
        const user = this.userRepo.create(createUserDto);
        // const bytes = utf8.encode(user.email);
        // const enc = base64.encode(bytes);
        // this.mailService.sendMail({
        //     to:user.email,
        //     from:'pawan.bansari@creolestudios.com',
        //     subject:'Verify your E-Mail!',
        //     text:enc,
        // })
        return this.userRepo.save(user);
    }

    async findById(id:number):Promise<CreateUserDto>{
        return this.userRepo.findOneBy({id});
    }

    async finByEmail(email:string):Promise<UserEntity>{
        const user = this.userRepo.findOne({
            where:{
                email:email
            }
        })
        if(!user){
            throw new BadRequestException("Invalid Credentials!");
        }
        return user;
    }
}
