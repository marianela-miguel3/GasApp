import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Artefacto from './artefacto.entity';
import { ArtefactoService } from './artefacto.service';
import ArtefactoDTO from './artefactoDTO';

@Controller('artefactos')
export class ArtefactoController {
    constructor(private readonly artefactoService: ArtefactoService) { }
    @Get()
    public async getArtefactos(): Promise<Artefacto[]> {
        return this.artefactoService.getArtefactos()
    };

    @Get(':idArtef')
    public async getArtefacto(@Param('idArtef') idArtef: string): Promise<Artefacto> {
        return this.artefactoService.getArtefacto(parseInt(idArtef));
    };

    @Post()
    public async createArtefacto(@Body() artefactoDTO: ArtefactoDTO): Promise<Artefacto[]> {
        return this.artefactoService.createArtefacto(artefactoDTO)
    };

    @Put()
    public async updateArtefacto(@Body() artefactoDTO: ArtefactoDTO): Promise<Artefacto[]> {
        return this.artefactoService.updateArtefacto(artefactoDTO);
    };

    @Delete(':idArtef')
    public async delArtefacto(@Param('idArtef')idArtef:string) :Promise<Artefacto[]> {
        return this.artefactoService.delArtefacto(parseInt(idArtef));
    };
}
