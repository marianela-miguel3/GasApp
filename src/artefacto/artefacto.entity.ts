import PresupuestoDeArtefactos from "src/presupuesto-de-artefactos/presupuesto-de-artefactos.entity";
import Tramo from "src/tramo/tramo.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity ('artefactos')
export default class Artefacto {
    @PrimaryColumn()
    private idArtefacto:number;
    @Column()
    private nombre_artefacto:string;
    @Column()
    private calorias:number;
    @Column()
    private metrosCubicos:number;

    @OneToMany(type => PresupuestoDeArtefactos,presupuestoArtefactos => presupuestoArtefactos.artefacto)
    public presupuestoArtefactos: PresupuestoDeArtefactos[];

    @OneToMany(type => Tramo, tramos => tramos.artefacto)
    public tramos:Tramo[];

    constructor(idArtef:number, nombArtef:string, calArtef:number, mtsCubicos:number) {
        this.idArtefacto=idArtef;
        this.nombre_artefacto=nombArtef;
        this.calorias=calArtef;
        this.metrosCubicos=mtsCubicos;
    }
    //GETERS
    public getIdArtef() :number{
        return this.idArtefacto
    };
    public getNomArtef() :string{
        return this.nombre_artefacto
    };
    public getCalArtef() :number{
        return this.calorias
    };
    public getMtsCubicos() :number{
        return this.metrosCubicos
    };
    //SETERS
    public setIdArtef(newIdArt:number) :void {
        this.idArtefacto = newIdArt;
    }
    public setNomArtef(newName:string) :void{
        this.nombre_artefacto = newName;
    }
    public setCalArtef(newCalor:number) :void{
        this.calorias = newCalor;
    }
    public setMtsCubicos(newMtsCub:number) :void{
        this.metrosCubicos = newMtsCub;
    }
}