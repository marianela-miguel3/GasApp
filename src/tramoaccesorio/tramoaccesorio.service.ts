import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import TramoAccesorio from './TramoAccesorio.entity';
import TramoAccesorioDTO from './TramoAccesorioDTO';
@Injectable()
export class TramoaccesorioService {
    constructor(
        @InjectRepository(TramoAccesorio) private readonly repoTramoAccesorio:Repository<TramoAccesorio>)
{}

public async getTramosAccesorios() : Promise<TramoAccesorio[]> {    
    try {
        const tramosAccesorios: TramoAccesorio[] = await this.repoTramoAccesorio.find()
        return tramosAccesorios;          
    } catch (error) {
        throw new HttpException( { error : `Error buscando los tramos de accesorios: ${error}`}, HttpStatus.NOT_FOUND);
    }  
}

//   public async getTramoAccesorio(idTramo:number,idAccesorio:number): Promise<TramoAccesorio> {
//     try{
//       const tramoAccesorio: TramoAccesorio= await this.repoTramoAccesorio.findOne({
//           where: { idTramo:`${idTramo}`, idAccesorio: `${idAccesorio}`}
//       });
//       return tramoAccesorio;
//     } catch (error){
//       throw new HttpException( { error : `Error buscando el id ingresado: ${error}`}, HttpStatus.NOT_FOUND);
//     }
//   }
public async getTramoAccesorio(id:number): Promise<TramoAccesorio> {
    try{
      const tramoAccesorio: TramoAccesorio= await this.repoTramoAccesorio.findOne(id)
      return tramoAccesorio;
    } catch (error){
      throw new HttpException( { error : `Error buscando el id ingresado: ${error}`}, HttpStatus.NOT_FOUND);
    }
  }

  public async addTramoAccesorio(tramoAccesorio: TramoAccesorioDTO): Promise<TramoAccesorio[]>{
    try{
      let tramoAccesorioNuevo= new TramoAccesorio(tramoAccesorio.idTramo,tramoAccesorio.idAccesorio,tramoAccesorio.cantidad,tramoAccesorio.equivalenteTramo);
      await this.repoTramoAccesorio.save(tramoAccesorioNuevo);
      const tramosAccesorios: TramoAccesorio[]=await this.repoTramoAccesorio.find()
      return tramosAccesorios;
    } catch(error){
      throw new HttpException( {error: `Error agregando nuevo tramoAccesorio: ${error}`}, HttpStatus.NOT_FOUND);
    }
   }

    public async updateTramoAccesorio(tramoAccesorio:TramoAccesorioDTO):Promise<TramoAccesorio[]>{
      try{
        const tramoAccesorioActualizado:TramoAccesorio=await this.repoTramoAccesorio.findOne(tramoAccesorio.idTramoAccesorio);
            //where: { idTramo : `${tramoAccesorio.idTramo}`, idAccesorio : `${tramoAccesorio.idAccesorio}`}});
        console.log(tramoAccesorioActualizado);
        if(!tramoAccesorioActualizado){
          throw new HttpException({ error: `error buscando el tramoaccesorio de id ${tramoAccesorio.idTramoAccesorio}`}, HttpStatus.NOT_FOUND);
        }
        tramoAccesorioActualizado.setTramo(tramoAccesorio.idTramo);
        tramoAccesorioActualizado.setAccesorio(tramoAccesorio.idAccesorio);
        tramoAccesorioActualizado.setCantidad(tramoAccesorio.cantidad);
        tramoAccesorioActualizado.setEquivalenteTramo(tramoAccesorio.equivalenteTramo);              
        await this.repoTramoAccesorio.save(tramoAccesorioActualizado);
        const tramosaccesorios: TramoAccesorio[]= await this.repoTramoAccesorio.find()
        console.log(tramosaccesorios);
        return tramosaccesorios;
      } catch (error){throw new HttpException( {error: `Error modificando el tramoaccesorio de id ${tramoAccesorio.idTramoAccesorio}`},HttpStatus.NOT_FOUND)
    }
}


    public async delTramoAccesorio(id:number): Promise<TramoAccesorio[]>{
        try{
          const tramoAccesorio:TramoAccesorio= await this.repoTramoAccesorio.findOne(id);
          if(!tramoAccesorio){
            throw new HttpException( { error: `error buscando el tramoaccesorio de id ${id}`}, HttpStatus.NOT_FOUND);
          }
          await this.repoTramoAccesorio.remove(tramoAccesorio);
          const tramosaccesorios: TramoAccesorio[]= await this.repoTramoAccesorio.find()
          return tramosaccesorios;
        }catch (error){
          throw new HttpException( { error: `error buscando el tramoaccesorio de id ${id}`}, HttpStatus.NOT_FOUND);
        }
     }

}
