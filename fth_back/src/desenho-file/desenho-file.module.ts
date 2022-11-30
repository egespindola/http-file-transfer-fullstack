import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesenhoFileEntity } from 'src/entities/desenho-file.entity'
import { DesenhoFileService } from 'src/desenho-file/desenho-file.service'
import { DesenhoFileController } from 'src/desenho-file/desenho-file.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([DesenhoFileEntity])
  ],
  controllers: [DesenhoFileController],
  providers: [DesenhoFileService],
  exports: [DesenhoFileService]
})
export class DesenhoFileModule {}
