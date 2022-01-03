import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Accesorio from './Accesorio.entity';
import { AccesoriosController } from './accesorios.controller';
import { AccesoriosService } from './accesorios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accesorio])
],
  controllers: [AccesoriosController],
  providers: [AccesoriosService]
})
export class AccesoriosModule {}
