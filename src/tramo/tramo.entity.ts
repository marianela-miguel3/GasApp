import Artefacto from "src/artefacto/artefacto.entity";
import TramoAccesorio from "src/tramoaccesorio/TramoAccesorio.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("tramos")
export default class Tramo{
    @PrimaryGeneratedColumn()
    private idTramo:number;
    @Column()
    private nombre_tramo:string;
    @Column()
    private longitud_real:number;
    @Column()
    private longitud_de_calculo:number;
    @Column()
    private metros_cubicos:number;
    
    // @ManyToOne(type => Artefacto, artefacto => artefacto.tramos)
    // @JoinColumn({name:"artefactos_idArtefacto"})
    // public artefacto:Artefacto;

    @OneToMany(type => TramoAccesorio,tramoAccesorios => tramoAccesorios.tramo)
    public tramoAccesorios:TramoAccesorio[];

    public constructor(nombre_tramo:string,longitud_real:number,longitud_de_calculo:number,metros_cubicos:number){    //artefacto?:Artefacto
        this.nombre_tramo=nombre_tramo;
        this.longitud_real=longitud_real;
        this.longitud_de_calculo=longitud_de_calculo;
        this.metros_cubicos=metros_cubicos;
    }
    public getIdTramo():number{
        return this.idTramo;
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