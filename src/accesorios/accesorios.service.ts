import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Accesorio from './Accesorio.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import AccesorioDTO from './accesorioDTO';
@Injectable()
export class AccesoriosService {
    constructor(
        @InjectRepository(Accesorio) private readonly repoAccesorio:Repository<Accesorio>)
{}

public async getAccesorios() : Promise<Accesorio[]> {    
    try {
        const accesorios: Accesorio[] = await this.repoAccesorio.find(
          {relations: ['tramoAccesorios','canio']}
        )
        return accesorios;          
    } catch (error) {
        throw new HttpException( { error : `Error buscando los accesorios: ${error}`}, HttpStatus.NOT_FOUND);
    }  
}

public async getAccesorio(id: number): Promise<Accesorio> {
    try{
      const accesorio: Accesorio= await this.repoAccesorio.findOne(id,
        {relations: ['tramoAccesorios','canio']}
        )
      return accesorio;
    } catch (error){
      throw new HttpException( { error : `Error buscando el id ingresado: ${error}`}, HttpStatus.NOT_FOUND);
    }
  }

  public async addAccesorio(accesorio: AccesorioDTO): Promise<Accesorio[]>{
    try{
      let accesorioNuevo= new Accesorio(accesorio.idAccesorio,accesorio.nombre_accesorio,accesorio.diametro,accesorio.equivalente,accesorio.idCanio,accesorio.precio);
      await this.repoAccesorio.save(accesorioNuevo);
      const accesorios: Accesorio[]=await this.repoAccesorio.find()
      return accesorios;
    } catch(error){
      throw new HttpException( {error: `Error agregando nuevo accesorio: ${error}`}, HttpStatus.NOT_FOUND);
    }
   }

   public async updateAccesorio(accesorio:AccesorioDTO):Promise<Accesorio[]>{
    try{
      const accesorioActualizado: Accesorio=await this.repoAccesorio.findOne(accesorio.idAccesorio);
      if(!accesorioActualizado){
        throw new HttpException({ error: `error buscando el cliente de id ${accesorio.idAccesorio}`}, HttpStatus.NOT_FOUND);
      }
      accesorioActualizado.nombre_accesorio;
      accesorioActualizado.diametro;
      accesorioActualizado.equivalente;
      // accesorioActualizado.idCanio;
      accesorioActualizado.setPrecio(accesorio.precio);
      await this.repoAccesorio.save(accesorioActualizado);
      const accesorios: Accesorio[]= await this.repoAccesorio.find()
      return accesorios;
    } catch (error){
      throw new HttpException( {error: `Error modificando la tarea de id ${accesorio.idAccesorio}`},HttpStatus.NOT_FOUND);
    }
    }

    public async delAccesorio(id:number): Promise<Accesorio[]>{
        try{
          const accesorio:Accesorio= await this.repoAccesorio.findOne(id);
          if(!accesorio){
            throw new HttpException( { error: `error buscando el cliente de id ${id}`}, HttpStatus.NOT_FOUND);
          }
          await this.repoAccesorio.remove(accesorio);
          const accesorios: Accesorio[]= await this.repoAccesorio.find()
          return accesorios;
        }catch (error){
          throw new HttpException( { error: `error buscando el cliente de id ${id}`}, HttpStatus.NOT_FOUND);
        }
     }

}
