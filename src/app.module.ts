import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramoModule } from './tramo/tramo.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TramoaccesorioModule } from './tramoaccesorio/tramoaccesorio.module';
import { ConsumoModule } from './consumo/consumo.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';
@Module({
  imports:[ServeStaticModule.forRoot({rootPath:join(__dirname,"..","app"),

}),TypeOrmModule.forRoot(),AccesoriosModule, TramoModule, UsuarioModule, 
TramoaccesorioModule, ConsumoModule, PresupuestoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

