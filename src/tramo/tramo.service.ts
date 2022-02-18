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
    public async addTramo(tramoDto:TramoDto): Promise<Tramo[]> {
        try {
            const tramoCreado= new Tramo (tramoDto.nombre_tramo,tramoDto.longitud_real,tramoDto.longitud_de_calculo,tramoDto.equivalente_total,tramoDto.total,tramoDto.metros_cubicos,tramoDto.diametro_de_calculo,tramoDto.diametro_adoptado);//tramoDto.artefacto
            await this.repoTramo.save(tramoCreado);
            const tramos: Tramo[] = await this.repoTramo.find()
            return tramos;
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
            tramoCambia.setEquivalenteTotal(tramoDto.equivalente_total);
            tramoCambia.setTotal(tramoDto.total);
            tramoCambia.setConsumo(tramoDto.metros_cubicos);
            tramoCambia.setDiametroCalculo(tramoDto.diametro_de_calculo);
            tramoCambia.setDiametroAdoptado(tramoDto.diametro_adoptado);
            await this.repoTramo.save(tramoCambia);
            const tramos: Tramo[] = await this.repoTramo.find();
            return tramos;
        } catch (error) {
            throw new HttpException("El tramo no existe", 404);
        }
    }
    public async delTramo(idTramo:number): Promise<Tramo[]> {
        // try {
            const tramo: Tramo = await this.repoTramo.findOne(idTramo);
            console.log(tramo);
            // if(!tramo) {
            //     throw new HttpException("El tramo no existe", 404);
            // }
            await this.repoTramo.remove(tramo);
            const tramos: Tramo[] = await this.repoTramo.find();
            return tramos;
    }
        // } catch (error) {
        //     throw new HttpException("El tramo no existe", 404);
        // }
}