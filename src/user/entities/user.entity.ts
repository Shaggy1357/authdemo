import { IsEmail, IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column({ unique: true })
	@IsEmail()
	email: string;

	@Column()
	@IsNotEmpty()
	password: string;

	@Column({ default: false })
	isVerified: boolean;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}

	async validatepassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this.password);
	}
}
