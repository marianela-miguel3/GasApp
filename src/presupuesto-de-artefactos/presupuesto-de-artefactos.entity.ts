import Artefacto from "src/artefacto/artefacto.entity";
import Presupuesto from "src/presupuesto/presupuesto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("presupuesto_de_artefactos")
export default class PresupuestoDeArtefactos{
    @PrimaryGeneratedColumn()
    private idPresupuesto_de_artefactos:number;
    // @Column()
    // private idPresupuesto:number;
    // @Column()
    // private idArtefacto:number;
    @Column()
    private cantidad:number
    @Column()
    private precio:number;

    @ManyToOne(type => Artefacto , artefacto => artefacto.presupuestoArtefactos)
    @JoinColumn({name:"idArtefacto"})
    public artefacto: Artefacto;

    // @ManyToOne(type => Presupuesto, presupuesto => presupuesto.presupuestoArtefactos)
    // @JoinColumn({name:"idPresupuesto"})
    // public presupuesto: Presupuesto;
    
    public constructor(idPresupuesto:Presupuesto,idArtefacto:Artefacto,cantidad:number,precio:number){
        // this.presupuesto=idPresupuesto;
        this.artefacto=idArtefacto;
        this.cantidad=cantidad;
        this.precio=precio;
    }
    // public getIdPresupuesto():Presupuesto{
    //     return this.presupuesto;
    // }
    public getIdArtefacto():Artefacto{
        return this.artefacto;
    }
    public setCantidad(cantidad:number){
        this.cantidad=cantidad;
    }
    public setPrecio(precio:number){
        this.precio=precio;
    }
}