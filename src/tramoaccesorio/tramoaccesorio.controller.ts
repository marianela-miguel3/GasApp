import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import TramoAccesorio from './TramoAccesorio.entity';
import { TramoaccesorioService } from './tramoaccesorio.service';
import TramoAccesorioDTO from './TramoAccesorioDTO';

@Controller('tramoaccesorio')
export class TramoaccesorioController {
    constructor(private readonly tramoaccesorioService:TramoaccesorioService){}

    @Get()
    public async getTramosAccesorios():Promise<TramoAccesorio[]>{
        return await this.tramoaccesorioService.getTramosAccesorios();
    }
    // @Get(`:idTramo/:idAccesorio`)
    // public async getTramoAccesorio(@Param(`idTramo`) idTramo:string,@Param(`ìdAccesorio`) idAccesorio:string):Promise<TramoAccesorio>{
    //     return await this.tramoaccesorioService.getTramoAccesorio(parseInt(idTramo),parseInt(idAccesorio));
    // }
    @Get(`:id`)
    public async getTramoAccesorio(@Param(`id`) id:string):Promise<TramoAccesorio>{
        return await this.tramoaccesorioService.getTramoAccesorio(parseInt(id));
    }

    @Post()
    public async addTramoAccesorio(@Body()tramoaccesorioDTO:TramoAccesorioDTO):Promise<TramoAccesorio[]>{
        return await this.tramoaccesorioService.addTramoAccesorio(tramoaccesorioDTO);
    }

    @Put()
    public async updateTramoAccesorio(@Body() tramoaccesorioDTO:TramoAccesorioDTO):Promise<TramoAccesorio[]>{
        return await this.tramoaccesorioService.updateTramoAccesorio(tramoaccesorioDTO);
    }

    @Delete(`:id`)
    public delTramoAccesorio(@Param("id") id:string):Promise<TramoAccesorio[]>{
        return this.tramoaccesorioService.delTramoAccesorio(parseInt(id));
    }
}
