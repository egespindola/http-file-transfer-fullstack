import { Injectable, BadRequestException } from '@nestjs/common';
import multer from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import * as fs from 'fs';
import { readdir } from 'node:fs/promises';
import { mkdirSync} from 'fs-extra'
// import { CreateDesenhoDto } from 'src/desenho-file/dto/create-desenho.dto'
// import { DesenhoFileEntity } from 'src/entities/desenho-file.entity'
import { DesenhoFileService } from './../desenho-file/desenho-file.service'

@Injectable()
export class FileService {
  constructor(
    private readonly desenhoFileService: DesenhoFileService
  ){}

   /* upload 1 file */
  async uploadFile(file: Express.Multer.File){
    console.log('\x1b[36m%s\x1b[0m', '>>>>>>>>>>>>>>>>>>>>>>>>>  inside ulpoadFile fn'); 
    const filename = file.filename
    const originalname = file.originalname
    console.log(`filename: ${filename}`)
    console.log(`originalname: ${originalname}`)

    this.desenhoFileService.insert(filename,originalname)

    return file
  }

  /* upload multiple files */
  async uploadFiles(files: any){
    const response = [];
    console.log('uploading')
    // console.log(files)    

    files.forEach(file => {
      console.log(file)
      this.desenhoFileService.insert(file.filename, file.originalname)
    });
    // return response;
    return files
  }

  /* list all raws from desenho_file table (filename and originalname) */
 async listFiles(): Promise<any>{
    console.log(process.env.APP_DOWNLOAD_DIR)
    const wrkDir = process.env.APP_DOWNLOAD_DIR;
    // let response = []
    // const files = fs.readdirSync(wrkDir)
    const response = this.desenhoFileService.getAll()
    
    return response;

  }

  async mkDir(dirName: string): Promise<string>{
    console.log(process.env.APP_FILES_DIR)
    console.log('Dirname to be created: ', dirName)

    const wrkDir = process.env.APP_FILES_DIR;

    try {
      fs.mkdirSync(`C:/Workspace/develop/filetransf-http/files/${dirName}`)
      return `Dir ${dirName} created successfully`
    } catch(err) {
      return err
    }
    
  }

}


