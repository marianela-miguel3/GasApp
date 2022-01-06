import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Canio from './canio.entity';
import CanioDTO from './canioDTO';

@Injectable()
export class CanioService {
    constructor(
        @InjectRepository(Canio) private readonly repoCanio: Repository<Canio>) { }

    public async getCanios(): Promise<Canio[]> {
        try {
            const canios: Canio[] = await this.repoCanio.find();
            return canios;
        } 
        catch (error) {
            throw new HttpException({ error: `Error buscando los caños: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    public async getCanio(idCanio: number): Promise<Canio> {
        try {
            const canio: Canio = await this.repoCanio.findOne(idCanio);
            return canio;
        } catch (error) {
            throw new HttpException({ error: `Error buscando el caño: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    public async createCanio(canioDTO:CanioDTO): Promise<Canio[]>{
        try {
            const newCanio = new Canio(canioDTO.idCanio, canioDTO.nombre);
            await this.repoCanio.save(newCanio);
            const canios:Canio[]=await this.repoCanio.find();
            return canios;
        } catch (error) {
            throw new HttpException( {error: `Error agregando nuevo caño: ${error}`}, HttpStatus.NOT_FOUND);
        }
    };

    public async updateCanio(canioDTO:CanioDTO) :Promise<Canio[]>{
        try {
            const canioUpd:Canio = await this.repoCanio.findOne(canioDTO.idCanio);
            if(!canioUpd){
                throw new HttpException({ error: `error buscando el id de caño ${canioDTO.idCanio}`}, HttpStatus.NOT_FOUND);
            }
            canioUpd.setIdCanio(canioDTO.idCanio);
            canioUpd.setNombreCanio(canioDTO.nombre);
            await this.repoCanio.save(canioUpd);
            const canios:Canio[]=await this.repoCanio.find();
            return canios;
        } catch (error) {
            throw new HttpException( {error: `Error modificando el caño de id ${canioDTO.idCanio}`},HttpStatus.NOT_FOUND);
        }
    };
    
    public async delCanio(idCanio:number) :Promise<Canio[]>{
        try {
            const deleteCanio:Canio = await this.repoCanio.findOne(idCanio);
            if(!deleteCanio){
                throw new HttpException({ error: `error buscando el id de caño ${idCanio}`}, HttpStatus.NOT_FOUND);
            }
            await this.repoCanio.remove(deleteCanio);
            const canios:Canio[]=await this.repoCanio.find();
            return canios;
        } catch (error) {
            throw new HttpException( {error: `Error modificando el caño de id ${idCanio}`},HttpStatus.NOT_FOUND);
        }
    };

}
