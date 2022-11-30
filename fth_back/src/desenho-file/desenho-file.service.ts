import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { CreateDesenhoDto } from './dto/create-desenho.dto'
import { DesenhoFileEntity } from 'src/entities/desenho-file.entity'
import { IDesenhoFile } from './interfaces/desenho-file.interface'

@Injectable()
export class DesenhoFileService {
  constructor(
    @InjectRepository(DesenhoFileEntity)
    private readonly desenhoFileRepository: Repository<DesenhoFileEntity>,
  ){}

  async insert(filename: string, originalname: string){
    const response = await this.desenhoFileRepository
      .createQueryBuilder()
      .insert()
      // .into(DesenhoFileEntity)
      .values([
          { filename: filename , originalname: originalname},
      ])
      .execute()

      return response

  }

  async getAll(): Promise<IDesenhoFile[]>{
    console.log('>>>>>>>>>>> desenhoFileService')
    return this.desenhoFileRepository.find({
      select: {
        filename: true,
        originalname: true
      }
    })
    

  }

}
