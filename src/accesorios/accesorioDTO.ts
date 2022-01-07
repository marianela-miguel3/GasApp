import Canio from "src/canio/canio.entity";

export default class AccesorioDTO{
    readonly idAccesorio:number;
    readonly nombre_accesorio:string;
    readonly diametro:string;
    readonly equivalente:number;
    readonly idCanio:Canio;
    readonly precio:number;
}