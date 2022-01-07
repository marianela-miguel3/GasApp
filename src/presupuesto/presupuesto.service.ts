import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresupuestoDto } from './presupuesto.dto';
import Presupuesto from './presupuesto.entity';

@Injectable()
export class PresupuestoService {

    constructor(@InjectRepository(Presupuesto) private readonly repoPresupuesto: Repository<Presupuesto>) {
    }

    public async getPresupuestos(): Promise<Presupuesto[]> {
        try {
            const presupuestos: Presupuesto[] = await this.repoPresupuesto.find();
            return presupuestos;
        } catch (error) {
            throw new HttpException( { error: `Error buscando los presupuestos: ${error}`}, HttpStatus.NOT_FOUND)
        }
    }
    public async getPresupuesto(idPresupuesto:number): Promise<Presupuesto> {
        try {
            const presupuesto: Presupuesto = await this.repoPresupuesto.findOne(idPresupuesto);
            return presupuesto;
        } catch (error) {
            throw new HttpException( { error: `Error buscando el presupuesto: ${idPresupuesto} ${error}`}, HttpStatus.NOT_FOUND);
        }
    }
    public async addPresupuesto(presupuestoDto:PresupuestoDto): Promise<Presupuesto> {
        try {
            const presupuestoCreado: Presupuesto = await this.repoPresupuesto.save(new Presupuesto(presupuestoDto.idPresupuesto,presupuestoDto.fecha,presupuestoDto.total,presupuestoDto.idUsuario));
            if(presupuestoCreado.getIdPresupuesto()){
                return presupuestoCreado;
            }else{
                throw new HttpException("No se pudo crear el presupuesto", HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: "Hay un error en la solicitud: " + error,}, HttpStatus.NOT_FOUND);
        }
    }
    public async updatePresupuesto(presupuestoDto:PresupuestoDto): Promise<Presupuesto[]> {
        try {
            const presupuestoCambia: Presupuesto = await this.repoPresupuesto.findOne(presupuestoDto.idPresupuesto);
            if(!presupuestoCambia) {
                throw new HttpException("El presupuesto no existe", 404);
            }
            presupuestoCambia.setFecha(presupuestoDto.fecha);
            presupuestoCambia.setTotal(presupuestoDto.total);
            await this.repoPresupuesto.save(presupuestoCambia);
            const presupuestos: Presupuesto[] = await this.repoPresupuesto.find();
            return presupuestos;
        } catch (error) {
            throw new HttpException("El presupuesto no existe", 404);
        }
    }
    public async delPresupuesto(idPresupuesto:number): Promise<Presupuesto[]> {
        try {
            const presupuesto: Presupuesto = await this.repoPresupuesto.findOne(idPresupuesto);
            if(!presupuesto) {
                throw new HttpException("El presupuesto no existe", 404);
            }
            await this.repoPresupuesto.remove(presupuesto);
            const presupuestos: Presupuesto[] =  await this.repoPresupuesto.find();
            return presupuestos;
        } catch (error) {
            throw new HttpException("El presupuesto no existe", 404);
        }
    }
}
