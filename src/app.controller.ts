import { UseInterceptors } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ParseFilePipe } from '@nestjs/common';
import { FileTypeValidator } from '@nestjs/common';
import { MaxFileSizeValidator } from '@nestjs/common';
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

  @Post('file-upload') // for text files
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body:sampleDto,
    @UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('image-upload') // for text files
  @UseInterceptors(FileInterceptor('file',{dest: './images'}))
  uploadImage(
    @Body() body: sampleDto,
    @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 20000 }),
        new FileTypeValidator({ fileType: 'png' }),
      ],
    }),
  )
  file: Express.Multer.File,){
    console.log(file);
  }
}
