import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramoModule } from './tramo/tramo.module';
// <<<<<<< create-artefacto
// import { ArtefactoController } from './artefacto/artefacto.controller';
// import { ArtefactoService } from './artefacto/artefacto.service';
import { ArtefactoModule } from './artefacto/artefacto.module';
@Module({
  imports:[ServeStaticModule.forRoot({rootPath:join(__dirname,"..","app"),
}),TypeOrmModule.forRoot(),AccesoriosModule, ArtefactoModule, TramoModule],
  controllers: [AppController
    // , ArtefactoController
  ],
  providers: [AppService
    // , ArtefactoService
  ],
// =======

// @Module({
//   imports:[ServeStaticModule.forRoot({rootPath:join(__dirname,"..","app"),
// }),TypeOrmModule.forRoot(),AccesoriosModule, TramoModule],
//   controllers: [AppController],
//   providers: [AppService],
// >>>>>>> master
})
export class AppModule {}

