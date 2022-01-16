import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Tramo from 'src/tramo/tramo.entity';
import TramoAccesorio from 'src/tramoaccesorio/TramoAccesorio.entity';
import Accesorio from './Accesorio.entity';
import { AccesoriosController } from './accesorios.controller';
import { AccesoriosService } from './accesorios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accesorio,Tramo,TramoAccesorio])
],
  controllers: [AccesoriosController],
  providers: [AccesoriosService]
})
export class AccesoriosModule {}
