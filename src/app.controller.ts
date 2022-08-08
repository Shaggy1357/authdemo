import { UseInterceptors } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
// import { Body } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { sampleDto } from '../sample.dto';
import { AppService } from './app.service';
// import { sampleDto } from '../sample.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // uploadFile(
  //   @Body() body: sampleDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body:sampleDto,
    @UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
