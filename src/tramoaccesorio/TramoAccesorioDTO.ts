import Accesorio from "src/accesorios/Accesorio.entity";

export default class TramoAccesorioDTO{
  readonly idTramoAccesorio:number;
  readonly idTramo:number;
  readonly idAccesorio:Accesorio;
  readonly cantidad:number;
  readonly equivalenteTramo:number;
}