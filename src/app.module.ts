import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
require('dotenv').config();

@Module({
  imports: [
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
