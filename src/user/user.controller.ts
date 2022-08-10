import { Inject } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { Param } from "@nestjs/common";
import { Query } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { emailDto } from "../email/dtos/email.dto";
import { CreateUserDto } from "./dtos/CreateUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(@Inject(UserService) private userService: UserService) {}

	@Post("create")
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get(":id")
	show(@Param("id") id: string) {
		return this.userService.findById(+id);
	}

	@Post("verify")
	checks(@Query("enc") enc: string, @Body() EmailDto: emailDto) {
		// console.log("11111");

		return this.userService.verify(enc, EmailDto);
	}
}
