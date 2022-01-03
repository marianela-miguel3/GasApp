import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[ServeStaticModule.forRoot({rootPath:join(__dirname,"..","app"),
}),TypeOrmModule.forRoot(),AccesoriosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

