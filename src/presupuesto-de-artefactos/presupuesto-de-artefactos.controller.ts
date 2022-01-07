import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PresupuestoDeArtefactosDto } from './presupuesto-de-artefactos.dto';
import PresupuestoDeArtefactos from './presupuesto-de-artefactos.entity';
import { PresupuestoDeArtefactosService } from './presupuesto-de-artefactos.service';

@Controller('presupuesto_de_artefactos')
export class PresupuestoDeArtefactosController {

    constructor(private readonly presupuestoDeArtefactosService: PresupuestoDeArtefactosService){}

    @Get()
    public async getPresupuestoDeArtefactos(): Promise<PresupuestoDeArtefactos[]>{
        return await this.presupuestoDeArtefactosService.getPresupuestoDeArtefactos();
    }
    @Get(":idPresupuestoArtefacto")
    public async getPresupuestoDeArtefacto(@Param("idPresupuestoArtefacto") idPresupArtefacto:string): Promise<PresupuestoDeArtefactos>{
        return await this.presupuestoDeArtefactosService.getPresupuestoDeArtefacto(parseInt(idPresupArtefacto));
    }
    @Post()
    public async createPresupArtefactos(@Body() presupArtefactosDto:PresupuestoDeArtefactosDto): Promise<PresupuestoDeArtefactos[]>{
        return await this.presupuestoDeArtefactosService.addPresupuestoArtefactos(presupArtefactosDto);
    }
    @Put()
    public async updatePresupArtefactos(@Body() presupArtefactosDto:PresupuestoDeArtefactosDto): Promise<PresupuestoDeArtefactos[]>{
        return await this.presupuestoDeArtefactosService.updatePresupDeArtefactos(presupArtefactosDto);
    }
    @Delete(":idPresupuestoArtefacto")
    public async deletePresupArtefactos(@Param("idPresupuestoArtefacto") idPresupArtefacto:string): Promise<PresupuestoDeArtefactos[]>{
        return await this.presupuestoDeArtefactosService.delPresupDeArtefactos(parseInt(idPresupArtefacto));
    }
}
