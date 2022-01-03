import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TramoDto } from './tramo.dto';
import Tramo from './tramo.entity';
import { TramoService } from './tramo.service';

@Controller('tramos')
export class TramoController {

    constructor(private readonly tramoService: TramoService){}

    @Get()
    public async getTramos(): Promise<Tramo[]>{
        return await this.tramoService.getTramos();
    }
    @Get(`:idTramo`)
    public async getTramo(@Param("idTramo") idTramo:string): Promise<Tramo>{
        return await this.tramoService.getTramo(parseInt(idTramo));
    }
    @Post()
    public async createTramo(@Body() tramoDto:TramoDto): Promise<Tramo>{
        return await this.tramoService.addTramo(tramoDto);
    }
    @Put()
    public async updateTramo(@Body() tramoDto:TramoDto): Promise<Tramo[]>{
        return await this.tramoService.updateTramo(tramoDto);
    }
    @Delete(":idTramo")
    public async deleteTramo(@Param("idTramo") idTramo:string): Promise<Tramo[]>{
        return await this.tramoService.delTramo(parseInt(idTramo));
    }
}
