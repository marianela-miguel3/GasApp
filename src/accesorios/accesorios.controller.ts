import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Accesorio from './Accesorio.entity';
import AccesorioDTO from './accesorioDTO';
import { AccesoriosService } from './accesorios.service';

@Controller('accesorios')
export class AccesoriosController{
    constructor(private readonly accesoriosService:AccesoriosService){}

    @Get()
    public async getAccesorios():Promise<Accesorio[]>{
        return await this.accesoriosService.getAccesorios();
    }
    @Get(`:id`)
    public async getAccesorio(@Param(`id`) id:string):Promise<Accesorio>{
        return await this.accesoriosService.getAccesorio(parseInt(id));
    }

    @Post()
    public async addAccesorio(@Body()accesorioDTO:AccesorioDTO):Promise<Accesorio[]>{
        return await this.accesoriosService.addAccesorio(accesorioDTO);
    }

    @Put()
    public async updateAccesorio(@Body() accesorioDTO:AccesorioDTO):Promise<Accesorio[]>{
        return await this.accesoriosService.updateAccesorio(accesorioDTO);
    }

    @Delete(`:id`)
    public delAccesorio(@Param("id") id:string):Promise<Accesorio[]>{
        return this.accesoriosService.delAccesorio(parseInt(id));
    }
}
