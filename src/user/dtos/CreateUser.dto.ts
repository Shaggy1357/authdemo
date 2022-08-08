import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";
// import { Match } from "../match.decorator";

export class CreateUserDto{

    @Column()
    username:string;
    
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'Password too WEAK!'})
    password:string;

    // @IsNotEmpty()
    // @MinLength(8)
    // @MaxLength(20)
    // @Match('password')
    // confirmPassword:string;
}