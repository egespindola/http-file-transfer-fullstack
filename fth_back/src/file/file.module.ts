import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DesenhoFileModule } from 'src/desenho-file/desenho-file.module'


@Module({
  imports:[DesenhoFileModule],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
