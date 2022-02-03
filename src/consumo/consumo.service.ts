import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Consumo from './consumo.entity';
import ConsumoDTO from './consumoDTO';

@Injectable()
export class ConsumoService {
    constructor(
        @InjectRepository(Consumo) private readonly repoConsumo: Repository<Consumo>) { }

    //GET
    public async getConsumos(): Promise<Consumo[]> {
        try {
            const consumos: Consumo[] = await this.repoConsumo.find();
                // {relations: ['canio']}
            return consumos;
        } catch (error) {
            throw new HttpException({ error: `Error buscando los consumos: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    //GET(:ID)
    public async getConsumo(idConsumo: number): Promise<Consumo> {
        try {
            const consumo: Consumo = await this.repoConsumo.findOne(idConsumo);        
            return consumo;
        } catch (error) {
            throw new HttpException({ error: `Error buscando el consumo: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    //POST
    public async createConsumo(consumoDTO: ConsumoDTO): Promise<Consumo[]> {
        try {
            const newConsumo = new Consumo(consumoDTO.idConsumo, consumoDTO.longitud, consumoDTO.cantidad_consumo, consumoDTO.diametro_canio)
            await this.repoConsumo.save(newConsumo);
            const consumo: Consumo[] = await this.repoConsumo.find();
            return consumo;
        } catch (error) {
            throw new HttpException({ error: `Error al agregar el consumo: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    //PUT
    public async updateConsumo(consumoDTO:ConsumoDTO):Promise<Consumo[]> {
        try {
            const consumoUpd:Consumo=await this.repoConsumo.findOne(consumoDTO.idConsumo);
            if(!consumoUpd){
                throw new HttpException({ error: `error buscando el id de consumo ${consumoDTO.idConsumo}`}, HttpStatus.NOT_FOUND);
            }
            consumoUpd.setIdConsumo(consumoDTO.idConsumo);
            consumoUpd.setLongitud(consumoDTO.longitud);
            consumoUpd.setCantConsumo(consumoDTO.cantidad_consumo);
            consumoUpd.setDiamCanio(consumoDTO.diametro_canio);
            await this.repoConsumo.save(consumoUpd);
            const consumos:Consumo[]=await this.repoConsumo.find();
            return consumos;
        } catch (error) {
            throw new HttpException({ error: `Error al modificar el consumo: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    public async deleteConsumo(idConsumo:number):Promise<Consumo[]> {
        try {
            const consumoDel:Consumo=await this.repoConsumo.findOne(idConsumo);
            if(!consumoDel){
                throw new HttpException({ error: `error buscando el id de consumo ${idConsumo}`}, HttpStatus.NOT_FOUND);
            }
            await this.repoConsumo.remove(consumoDel);
            const consumos:Consumo[]=await this.repoConsumo.find();
            return consumos;
        } catch (error) {
            throw new HttpException({ error: `Error al eliminar el consumo: ${error}` }, HttpStatus.NOT_FOUND);
        }
    };

    public async getConsumoFinal(metros:number):Promise<Consumo[]>{
        try {
            const consumos:Consumo[]=await this.repoConsumo.find({where : { longitud : `${metros}`}});
            if(consumos){
                console.log(consumos)
                return consumos;
            }else{
                const consumos2:Consumo[]=await this.repoConsumo.find({where : { longitud : `${metros+1}`}});
                console.log(consumos2);
                return consumos2;
            }
        } catch (error) {
            throw new HttpException({ error: `Error buscando el consumo: ${error}` }, HttpStatus.NOT_FOUND);
        };
    }
}
