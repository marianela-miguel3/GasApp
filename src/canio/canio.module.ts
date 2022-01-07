import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanioController } from './canio.controller';
import Canio from './canio.entity';
import { CanioService } from './canio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Canio])
],
  controllers: [CanioController],
  providers: [CanioService]
})
export class CanioModule {}
