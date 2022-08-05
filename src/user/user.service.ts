import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>){}

    async create(createUserDto:CreateUserDto):Promise<CreateUserDto>{
        const user = this.userRepo.create(createUserDto);
        bcrypt.hash(user.password,10);
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
