import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoController } from './consumo.controller';
import Consumo from './consumo.entity';
import { ConsumoService } from './consumo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consumo])
],
  controllers: [ConsumoController],
  providers: [ConsumoService]
})
export class ConsumoModule {}
