import { MailerService } from "@nestjs-modules/mailer";
import { Get } from "@nestjs/common";
import { Controller } from "@nestjs/common";
var base64 = require("base-64");
var utf8 = require("utf8");

@Controller("email")
export class EmailController {
	constructor(private mailService: MailerService) {}

	@Get("plain-text-email")
	async plainTextEmail() {
		// console.log(toEmail);
		const tsxts = "Welcome NestJS Email Sending Tutorial";
		const bytes = utf8.encode(tsxts);
		const enc = base64.encode(bytes);
		await this.mailService.sendMail({
			to: "pawan.bansari@creolestudios.com",
			from: "pawan.bansari@creolestudios.com",
			subject: "Plain Text Email ✔",
			text: enc
		});
		return "success";
	}
}
