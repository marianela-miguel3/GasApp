import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtefactoController } from './artefacto.controller';
import Artefacto from './artefacto.entity';
import { ArtefactoService } from './artefacto.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Artefacto])
    ],
      controllers: [ArtefactoController],
      providers: [ArtefactoService]
})
export class ArtefactoModule {}
