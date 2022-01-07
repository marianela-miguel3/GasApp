import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresupuestoDeArtefactosController } from './presupuesto-de-artefactos.controller';
import PresupuestoDeArtefactos from './presupuesto-de-artefactos.entity';
import { PresupuestoDeArtefactosService } from './presupuesto-de-artefactos.service';

@Module({
  imports: [TypeOrmModule.forFeature([PresupuestoDeArtefactos])],
  controllers: [PresupuestoDeArtefactosController],
  providers: [PresupuestoDeArtefactosService]
})
export class PresupuestoDeArtefactosModule {}
