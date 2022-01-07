import Artefacto from "src/artefacto/artefacto.entity";

export class TramoDto{
    readonly idTramo:number;
    readonly nombre_tramo:string;
    readonly longitud_real:number;
    readonly longitud_de_calculo:number;
    readonly artefactos_idArtefacto:Artefacto; //artefacto:Artefacto
}