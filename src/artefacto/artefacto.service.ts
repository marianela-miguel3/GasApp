import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Artefacto from './artefacto.entity';
import ArtefactoDTO from './artefactoDTO';

@Injectable()
export class ArtefactoService {
    constructor(
        @InjectRepository(Artefacto) private readonly repoArtefacto: Repository<Artefacto>) { }

    public async getArtefactos(): Promise<Artefacto[]> {
        try {
            const artefactos: Artefacto[] = await this.repoArtefacto.find()
            return artefactos;
        } catch (error) {
            throw new HttpException({ error: `Error buscando los artefactos: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    public async getArtefacto(idArtef: number): Promise<Artefacto> {
        try {
            const artefacto: Artefacto = await this.repoArtefacto.findOne(idArtef)
            return artefacto;
        } catch (error) {
            throw new HttpException({ error: `Error buscando el artefacto: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    public async createArtefacto(artefactoDTO: ArtefactoDTO): Promise<Artefacto[]> {
        try {
            const artefactoNuevo = new Artefacto(artefactoDTO.idArtefacto, artefactoDTO.nombre_artefacto, artefactoDTO.calorias, artefactoDTO.metrosCubicos)
            await this.repoArtefacto.save(artefactoNuevo);
            const artefactos: Artefacto[] = await this.repoArtefacto.find();
            return artefactos;
        } catch (error) {
            throw new HttpException( {error: `Error agregando nuevo artefacto: ${error}`}, HttpStatus.NOT_FOUND);
        }
    };

    public async updateArtefacto(artefactoDTO: ArtefactoDTO) :Promise<Artefacto[]> {
        try {
            const artefactoUpd : Artefacto = await this.repoArtefacto.findOne(artefactoDTO.idArtefacto);
            if(!artefactoUpd) {
                throw new HttpException({ error: `error buscando el id de artefacto ${artefactoDTO.idArtefacto}`}, HttpStatus.NOT_FOUND);
            }
            artefactoUpd.setNomArtef(artefactoDTO.nombre_artefacto);
            artefactoUpd.setCalArtef(artefactoDTO.calorias);
            artefactoUpd.setMtsCubicos(artefactoDTO.metrosCubicos);
            await this.repoArtefacto.save(artefactoUpd);
            const artefactos:Artefacto[] = await this.repoArtefacto.find();
            return artefactos;
        } catch (error) {
            throw new HttpException( {error: `Error modificando el artefacto de id ${artefactoDTO.idArtefacto}`},HttpStatus.NOT_FOUND);
        }
    };

    public async delArtefacto(idArtefacto:number) :Promise<Artefacto[]> {
        try {
            const delArtefacto : Artefacto = await this.repoArtefacto.findOne(idArtefacto);
            if(!delArtefacto) {
                throw new HttpException({ error: `error buscando el id de artefacto ${idArtefacto}`}, HttpStatus.NOT_FOUND);
            }
            await this.repoArtefacto.remove(delArtefacto)
            const artefactos:Artefacto[] = await this.repoArtefacto.find();
            return artefactos;
        } catch (error) {
            throw new HttpException( {error: `Error eliminando el artefacto de id ${idArtefacto}`},HttpStatus.NOT_FOUND);
        }
    };

};
