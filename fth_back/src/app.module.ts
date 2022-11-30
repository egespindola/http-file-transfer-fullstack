import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DesenhoFileModule } from './desenho-file/desenho-file.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.local.env', isGlobal: true}),
    FileModule,
    MulterModule.register({
      dest: './files',
    }),
    DesenhoFileModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.APP_MARIADB_HOST,
      port: +process.env.MARIADB_PORT,
      username: process.env.APP_MS_VND_USER_MA,
      password: process.env.APP_MS_VND_USER_MA_PASSWD,
      database: process.env.APP_MARIADB_DB,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      logging: ['query'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
