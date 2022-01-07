import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresupuestoController } from './presupuesto.controller';
import Presupuesto from './presupuesto.entity';
import { PresupuestoService } from './presupuesto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Presupuesto])],
  controllers: [PresupuestoController],
  providers: [PresupuestoService]
})
export class PresupuestoModule {}
