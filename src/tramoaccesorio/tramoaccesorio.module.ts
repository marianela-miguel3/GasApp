import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Accesorio from 'src/accesorios/Accesorio.entity';
import { TramoaccesorioController } from './tramoaccesorio.controller';
import TramoAccesorio from './TramoAccesorio.entity';
import { TramoaccesorioService } from './tramoaccesorio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TramoAccesorio,Accesorio])
],
  controllers: [TramoaccesorioController],
  providers: [TramoaccesorioService]
})
export class TramoaccesorioModule {}
