import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthLoginDto } from "../auth/dtos/authLogin.dto";
import { emailDto } from "../email/dtos/email.dto";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { UserEntity } from "./entities/user.entity";
var base64 = require("base-64");
var utf8 = require("utf8");
@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
		private mailService: MailerService
	) {}

	async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
		// const user1 = this.userRepo.findOne({
		//     where:{
		//         email:createUserDto.email
		//     }
		// })
		// console.log(user1);
		// if(user1){
		//     throw new BadRequestException("User Already exists!");
		// }
		//const user = this.userRepo.create(createUserDto);
		const user1 = await this.userRepo.findOne({
			where: {
				email: createUserDto.email
			}
		});
		console.log(user1);
		if (user1) {
			throw new BadRequestException("User Already exists!");
		}
		const user = this.userRepo.create(createUserDto);
		const bytes = utf8.encode(user.email);
		const enc = base64.encode(bytes);
		this.mailService.sendMail({
			to: user.email,
			from: "pawan.bansari@creolestudios.com",
			subject: "Verify your E-Mail!",
			text: enc
		});
		return this.userRepo.save(user);
	}

	async findById(id: number): Promise<CreateUserDto> {
		return this.userRepo.findOneBy({ id });
	}

	async finByEmail(email: string): Promise<UserEntity> {
		const user = await this.userRepo.findOne({
			where: {
				email: email
			}
		});
		if (!user) {
			throw new BadRequestException("Invalid Credentials!");
		}
		return user;
	}

	async verify(enc: string, EmailDto: emailDto) {
		const bytes = utf8.decode(enc);

		const mail = base64.decode(bytes);

		if (mail == EmailDto.email) {
			const user = await this.userRepo.findOne({
				where: { email: mail }
			});

			user.isVerified = true;

			return await this.userRepo.save(user);
		}
	}
}
