import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Canio from './canio.entity';
import { CanioService } from './canio.service';
import CanioDTO from './canioDTO';

@Controller('canio')
export class CanioController {
    constructor(private readonly canioService: CanioService) { }

    @Get()
    public async getCanios():Promise<Canio[]>{
        return this.canioService.getCanios()
    };

    @Get(':idCanio')
    public async getCanio(@Param('idCanio') idCanio:string) :Promise<Canio>{
        return this.canioService.getCanio(parseInt(idCanio));
    };

    @Post()
    public async createCanio(@Body()canioDTO:CanioDTO):Promise<Canio[]>{
        return this.canioService.createCanio(canioDTO)
    };

    @Put()
    public async updateCanio(@Body() canioDTO:CanioDTO) :Promise<Canio[]>{
        return this.canioService.updateCanio(canioDTO)
    };

    @Delete(':idCanio')
    public async delCanio(@Param('idCanio') idCanio:string) :Promise<Canio[]>{
        return this.canioService.delCanio(parseInt(idCanio))
    };
}
