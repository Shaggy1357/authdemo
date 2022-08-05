import { IsEmail, IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateUserDto{

    @Column()
    username:string;
    
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
}