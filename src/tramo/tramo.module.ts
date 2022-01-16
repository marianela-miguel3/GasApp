import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Accesorio from 'src/accesorios/Accesorio.entity';
import TramoAccesorio from 'src/tramoaccesorio/TramoAccesorio.entity';
import { TramoController } from './tramo.controller';
import Tramo from './tramo.entity';
import { TramoService } from './tramo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tramo,Accesorio,TramoAccesorio])],
  controllers: [TramoController],
  providers: [TramoService]
})
export class TramoModule {}