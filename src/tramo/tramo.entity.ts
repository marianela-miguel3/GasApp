import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity("tramos")
export default class Tramo{
    @PrimaryColumn()
    private idTramo:number;
    @Column()
    private nombre_tramo:string;
    @Column()
    private longitud_real:number;
    @Column()
    private longitud_de_calculo:number;
    @Column()
    private artefactos_idArtefacto:number;
    
    // @ManyToOne(type => Artefacto, artefacto => artefacto.tramo)
    // @JoinColumn({name:"id_artefacto"});
    // public artefacto:Artefacto;

    // @OneToMany(type => TramoAccesorios, tramoAccesorios.tramo)
    // public tramoAccesorios:TramoAccesorios[];

    public constructor(idTramo:number,nombre_tramo:string,longitud_real:number,longitud_de_calculo:number,artefactos_idArtefacto:number){    //artefacto?:Artefacto
        this.idTramo=idTramo;
        this.nombre_tramo=nombre_tramo;
        this.longitud_real=longitud_real;
        this.longitud_de_calculo=longitud_de_calculo;
        this.artefactos_idArtefacto=artefactos_idArtefacto;
    }
    public getIdTramo():number{
        return this.idTramo;
    }
    public getIdArtefacto():number{
        return this.artefactos_idArtefacto;
    }
    public setNombre_tramo(nombre_tramo:string){
        this.nombre_tramo=nombre_tramo;
    }
    public setLongitud_real(longitud_real:number){
        this.longitud_real=longitud_real;
    }
    public setLongitud_de_calculo(longitud_de_calculo:number){
        this.longitud_de_calculo=longitud_de_calculo;
    }
}