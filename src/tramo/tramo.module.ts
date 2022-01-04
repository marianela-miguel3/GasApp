import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramoController } from './tramo.controller';
import Tramo from './tramo.entity';
import { TramoService } from './tramo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tramo])],
  controllers: [TramoController],
  providers: [TramoService]
})
export class TramoModule {}