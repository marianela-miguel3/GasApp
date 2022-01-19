import Accesorio from "src/accesorios/Accesorio.entity";
import Tramo from "src/tramo/tramo.entity";

export default class TramoAccesorioDTO{
  readonly idTramoAccesorio:number;
  readonly idTramo:Tramo;
  readonly idAccesorio:Accesorio;
  readonly cantidad:number;
  readonly equivalenteTramo:number;
  readonly tramo_precio_accesorio:number;
}