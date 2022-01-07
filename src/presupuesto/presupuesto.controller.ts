import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { parse } from 'path/posix';
import { PresupuestoDto } from './presupuesto.dto';
import Presupuesto from './presupuesto.entity';
import { PresupuestoService } from './presupuesto.service';

@Controller('presupuesto')
export class PresupuestoController {

    constructor(private readonly presupuestoService:PresupuestoService){}

    @Get()
    public async getPresupuestos(): Promise<Presupuesto[]>{
        return await this.presupuestoService.getPresupuestos();
    }
    @Get(":idPresupuesto")
    public async getPresupuesto(@Param("idPresupuesto") idPresupuesto:string): Promise<Presupuesto>{
        return await this.presupuestoService.getPresupuesto(parseInt(idPresupuesto));
    }
    @Post()
    public async createPresupuesto(@Body() presupuestoDto:PresupuestoDto): Promise<Presupuesto>{
        return await this.presupuestoService.addPresupuesto(presupuestoDto);
    }
    @Put()
    public async updatePresupuesto(@Body() presupuestoDto:PresupuestoDto): Promise<Presupuesto[]>{
        return await this.presupuestoService.updatePresupuesto(presupuestoDto);
    }
    @Delete(":idPresupuesto")
    public async deletePresupuesto(@Param("idPresupuesto") idPresupuesto:string): Promise<Presupuesto[]>{
        return await this.presupuestoService.delPresupuesto(parseInt(idPresupuesto));
    }
}
