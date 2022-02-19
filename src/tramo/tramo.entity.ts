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
    private equivalente_total:number;
    @Column()
    private total:number;
    @Column()
    private metros_cubicos:number;
    @Column()
    private diametro_de_calculo:number;
    @Column()
    private diametro_adoptado:number;

    // @OneToMany(type => TramoAccesorio,tramoAccesorios => tramoAccesorios.tramo,{
    //     cascade: true,
    // })
    public tramoAccesorios:TramoAccesorio[];

    public constructor(nombre_tramo:string,longitud_real:number,longitud_de_calculo:number,equivalente_total:number, total:number,metros_cubicos:number,diametro_de_calculo:number,diametro_adoptado:number){    
        this.nombre_tramo=nombre_tramo;
        this.longitud_real=longitud_real;
        this.longitud_de_calculo=longitud_de_calculo;
        this.equivalente_total=equivalente_total;
        this.total=total;
        this.metros_cubicos=metros_cubicos;
        this.diametro_de_calculo=diametro_de_calculo;
        this.diametro_adoptado=diametro_adoptado;
    }
    public getIdTramo():number{
        return this.idTramo;
    }
    public setEquivalenteTotal(equiNuevo:number):void{
        this.equivalente_total=equiNuevo;
    }
    public setTotal(totalNuevo:number):void{
        this.total=totalNuevo;
    }
    public setConsumo(consumoNuevo:number):void {
        this.metros_cubicos=consumoNuevo;
    }
    public setDiametroCalculo(diametroCalNuevo:number):void{
        this.diametro_de_calculo=diametroCalNuevo;
    }
    public setDiametroAdoptado(diametroNuevo:number):void{
        this.diametro_adoptado=diametroNuevo;
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