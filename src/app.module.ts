import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ArtefactoController } from './artefacto/artefacto.controller';
// import { ArtefactoService } from './artefacto/artefacto.service';
import { ArtefactoModule } from './artefacto/artefacto.module';
@Module({
  imports:[ServeStaticModule.forRoot({rootPath:join(__dirname,"..","app"),
}),TypeOrmModule.forRoot(),AccesoriosModule, ArtefactoModule],
  controllers: [AppController
    // , ArtefactoController
  ],
  providers: [AppService
    // , ArtefactoService
  ],
})
export class AppModule {}

