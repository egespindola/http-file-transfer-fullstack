import { Controller, UploadedFile, UploadedFiles, UseInterceptors, Get,Post, Param, Query,Body,StreamableFile } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { join } from 'path';
// import LocalFilesInterceptor from './../local-file/localFiles.interceptor'
import { FileService } from './file.service'
import { diskStorage } from 'multer';
import { editFileName } from './../utils/files-interceptor/editFileName'
import { createReadStream } from 'fs';
import { IDesenhoFile } from './../desenho-file/interfaces/desenho-file.interface'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('listAll')
  async getAllFiles(): Promise<IDesenhoFile[]> {
    return this.fileService.listFiles()
  }
    
  @Get('/:filename')
  async getFile(
    @Param('filename') filename: string
    ): Promise<StreamableFile> {
      // const file = createReadStream('C:/Workspace/develop/filetransf-http/files/download/tst.pdf');
      const file = createReadStream(`C:/Workspace/develop/filetransf-http/files/${filename}`);
      console.log(file)
      return new StreamableFile(file);
    }
      
  @Post('one')
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
      destination: 'C:/Workspace/develop/filetransf-http/files',
      filename: editFileName
    })
  }))
  async uploadOneFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    return this.fileService.uploadFile(file)
  }

  @Post('mkdir')
  async createDir(
    @Body('dirName') dirName: string
  ): Promise<String>{
    return this.fileService.mkDir(dirName)
  }


  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: 'C:/Workspace/develop/filetransf-http/files',
        filename: editFileName
      }),
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
       return this.fileService.uploadFiles(files)
  }
}
