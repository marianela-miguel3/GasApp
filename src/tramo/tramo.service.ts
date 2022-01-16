import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Accesorio from 'src/accesorios/Accesorio.entity';
import { Repository } from 'typeorm';
import { TramoDto } from './tramo.dto';
import Tramo from './tramo.entity';

@Injectable()
export class TramoService {

    constructor(@InjectRepository(Tramo) private readonly repoTramo: Repository<Tramo>,
    @InjectRepository(Accesorio) private readonly repoAccesorio: Repository<Accesorio>) {}


    public async getTramos(): Promise<Tramo[]> {
        try {
            const tramos: Tramo[] = await this.repoTramo.find(
                { relations: ['tramoAccesorios'] },
            );
            return tramos;
        } catch (error) {
            throw new HttpException( { error: `Error Buscando los Tramos: ${error}`}, HttpStatus.NOT_FOUND)
        }
    }
    public async getTramo(idTramo:number): Promise<Tramo> {
        try {
            const tramos: Tramo = await this.repoTramo.findOne(idTramo,
                { relations: ['tramoAccesorios'] }
                );
            return tramos;
        } catch (error) {
            throw new HttpException( { error: `Error Buscando el Tramo de: ${idTramo} ${error}`}, HttpStatus.NOT_FOUND)
        }
    }
    public async addTramo(tramoDto:TramoDto): Promise<Tramo> {
        try {
            const tramoCreado: Tramo = await this.repoTramo.save(new Tramo(tramoDto.nombre_tramo,tramoDto.longitud_real,tramoDto.longitud_de_calculo,tramoDto.metros_cubicos)) //tramoDto.artefacto
            if(tramoCreado.getIdTramo()){
                return tramoCreado;
            }else{
                throw new HttpException("No se pudo crear el Tramo", HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            throw new HttpException({status: HttpStatus.NOT_FOUND, error: "Hay un error en la solicitud:" + error,}, HttpStatus.NOT_FOUND)
        }
    }
    public async updateTramo(tramoDto:TramoDto): Promise<Tramo[]> {
        try {
            const tramoCambia: Tramo = await this.repoTramo.findOne(tramoDto.idTramo);
            if(!tramoCambia) {
                throw new HttpException("El tramo no existe", 404);
            }
            tramoCambia.setNombre_tramo(tramoDto.nombre_tramo);
            tramoCambia.setLongitud_real(tramoDto.longitud_real);
            tramoCambia.setLongitud_de_calculo(tramoDto.longitud_de_calculo);
            await this.repoTramo.save(tramoCambia);
            const tramos: Tramo[] = await this.repoTramo.find();
            return tramos;
        } catch (error) {
            throw new HttpException("El tramo no existe", 404);
        }
    }
    public async delTramo(idTramo:number): Promise<Tramo[]> {
        try {
            const tramo: Tramo = await this.repoTramo.findOne(idTramo);
            if(!tramo) {
                throw new HttpException("El tramo no existe", 404);
            }
            await this.repoTramo.remove(tramo);
            const tramos: Tramo[] = await this.repoTramo.find();
            return tramos;
        } catch (error) {
            throw new HttpException("El tramo no existe", 404);
        }
    }
}
