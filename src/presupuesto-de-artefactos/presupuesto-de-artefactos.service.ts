import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresupuestoDeArtefactosDto } from './presupuesto-de-artefactos.dto';
import PresupuestoDeArtefactos from './presupuesto-de-artefactos.entity';

@Injectable()
export class PresupuestoDeArtefactosService {

    constructor(@InjectRepository(PresupuestoDeArtefactos) private readonly repoPresupuestoDeArtefactos: Repository<PresupuestoDeArtefactos>) {
    }

    public async getPresupuestoDeArtefactos(): Promise<PresupuestoDeArtefactos[]> {
        try {
            const presupuestoArtefactos: PresupuestoDeArtefactos[] = await this.repoPresupuestoDeArtefactos.find();
            return presupuestoArtefactos;
        } catch (error) {
            throw new HttpException( { error: `Error Buscando los presupuestos de Artefactos: ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    public async getPresupuestoDeArtefacto(idPresuArtefact:number): Promise<PresupuestoDeArtefactos> {
        try {
            const presupuestoArtefacto: PresupuestoDeArtefactos = await this.repoPresupuestoDeArtefactos.findOne(idPresuArtefact);
            return presupuestoArtefacto;
        } catch (error) {
            throw new HttpException( { error: `Error Buscando el presupuesto de Artefactos: ${idPresuArtefact} ${error}`}, HttpStatus.NOT_FOUND)
        }
    }
    public async addPresupuestoArtefactos(presupArtefactoDto:PresupuestoDeArtefactosDto): Promise<PresupuestoDeArtefactos[]> {
        try {
            let presupArtefactosCreado = new PresupuestoDeArtefactos(
            presupArtefactoDto.idPresupuesto,
            presupArtefactoDto.idArtefacto,
            presupArtefactoDto.cantidad,
            presupArtefactoDto.precio);
            await this.repoPresupuestoDeArtefactos.save(presupArtefactosCreado)
            const presupArtefacto: PresupuestoDeArtefactos[] = await this.repoPresupuestoDeArtefactos.find();
            return presupArtefacto;
        } catch (error) {
            console.log(error);
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: "Hay un error en la solicitud:" + error,}, HttpStatus.NOT_FOUND)
        }
    }
    public async updatePresupDeArtefactos(presupDeArtefactDto:PresupuestoDeArtefactosDto): Promise<PresupuestoDeArtefactos[]> {
        try {
            const presupArtefactoCambia: PresupuestoDeArtefactos = await this.repoPresupuestoDeArtefactos.findOne(presupDeArtefactDto.idPresupuesto_de_artefactos);
            if(!presupArtefactoCambia) {
                throw new HttpException("El presupuesto de artefactos no existe", 404);
            }
            presupArtefactoCambia.setCantidad(presupDeArtefactDto.cantidad);
            presupArtefactoCambia.setPrecio(presupDeArtefactDto.precio);
            await this.repoPresupuestoDeArtefactos.save(presupArtefactoCambia);
            const presupArtefactos: PresupuestoDeArtefactos[] = await this.repoPresupuestoDeArtefactos.find();
            return presupArtefactos;
        } catch (error) {
            throw new HttpException("El presupuesto de artefactos no existe", 404);
        }
    }
    public async delPresupDeArtefactos(idPresupArtefacto:number): Promise<PresupuestoDeArtefactos[]> {
        try {
            const presupArtefacto: PresupuestoDeArtefactos = await this.repoPresupuestoDeArtefactos.findOne(idPresupArtefacto);
            if(!presupArtefacto) {
                throw new HttpException("El presupuesto de artefactos no existe", 404);
            }
            await this.repoPresupuestoDeArtefactos.remove(presupArtefacto);
            const presupArtefactos: PresupuestoDeArtefactos[] = await this.repoPresupuestoDeArtefactos.find();
            return presupArtefactos;
        } catch (error) {
            throw new HttpException("El presupuesto de artefactos no existe", 404);
        }
    }
}
