import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email/email.controller';
require('dotenv').config();


@Module({
  imports: [
    MailerModule.forRoot ({
      transport:{
        host:"smtp.sendgrid.net",
        auth:{
          user:'apikey',
          pass:'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',
        },
      }
    }),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.DB_HOST,
      port:3306,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      entities:[UserEntity],
      synchronize:true
    })
  ,UserModule, AuthModule],
  controllers: [AppController, EmailController],
  providers: [AppService],
})
export class AppModule {}
