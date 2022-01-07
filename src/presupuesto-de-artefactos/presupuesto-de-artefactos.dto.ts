import Artefacto from "src/artefacto/artefacto.entity";
import Presupuesto from "src/presupuesto/presupuesto.entity";

export class PresupuestoDeArtefactosDto{
    readonly idPresupuesto_de_artefactos:number;
    readonly idPresupuesto:Presupuesto;
    readonly idArtefacto:Artefacto;
    readonly cantidad:number;
    readonly precio:number;
}