import { BadRequestException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { AuthLoginDto } from "./dtos/authLogin.dto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService
	) {}

	async login(authLoginDto: AuthLoginDto) {
		const user = await this.validateUser(authLoginDto);
		if (user.isVerified == false) {
			throw new BadRequestException("You have not verified your account!");
		}
		const payload = {
			userId: user.id
		};
		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async validateUser(authLoginDto: AuthLoginDto): Promise<UserEntity> {
		const user = await this.userService.finByEmail(authLoginDto.email);
		if (!(await user?.validatepassword(authLoginDto.password))) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
