import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Consumo from './consumo.entity';
import { ConsumoService } from './consumo.service';
import ConsumoDTO from './consumoDTO';

@Controller('consumo')
export class ConsumoController {
    constructor(private readonly consumoService: ConsumoService) { }

    @Get()
    public async getConsumos():Promise<Consumo[]>{
        return this.consumoService.getConsumos()
    };

    @Get(':metros')
    public async getConsumoFinal(@Param('metros') metros:string) :Promise<Consumo[]>{
        return this.consumoService.getConsumoFinal(parseInt(metros));
    };

    @Get(':idConsumo')
    public async getConsumo(@Param('idConsumo') idConsumo:string) :Promise<Consumo>{
        return this.consumoService.getConsumo(parseInt(idConsumo));
    };

    @Post()
    public async createConsumo(@Body() consumoDTO:ConsumoDTO):Promise<Consumo[]>{
        return this.consumoService.createConsumo(consumoDTO)
    };

    @Put()
    public async updateConsumo(@Body() consumoDTO:ConsumoDTO) :Promise<Consumo[]>{
        return this.consumoService.updateConsumo(consumoDTO)
    };

    @Delete(':idConsumo')
    public async deleteConsumo(@Param('idConsumo') idConsumo:string) :Promise<Consumo[]>{
        return this.consumoService.deleteConsumo(parseInt(idConsumo))
    };

}
