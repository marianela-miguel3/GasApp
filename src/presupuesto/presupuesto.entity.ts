import PresupuestoDeArtefactos from "src/presupuesto-de-artefactos/presupuesto-de-artefactos.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity("presupuesto")
export default class Presupuesto{
    @PrimaryColumn()
    private idPresupuesto:number;
    @Column()
    private fecha:Date;
    @Column()
    private total:number;
    @Column()
    private idUsuario:number;

    // @ManyToOne(type => Usuario, usuario => usuario.presupuesto)
    // @JoinColumn({name:"idUsuario"});
    // public usuario:Usuario;

    // @OneToMany(type => PresupuestoDeArtefactos, presupuestoArtefactos => presupuestoArtefactos.presupuesto)
    // public presupuestoArtefactos: PresupuestoDeArtefactos[];

    public constructor(idPresupuesto:number,fecha:Date,total:number,idUsuario:number){
        this.idPresupuesto=idPresupuesto;
        this.fecha=fecha;
        this.total=total;
        this.idUsuario=idUsuario;
    }
    public getIdPresupuesto():number{
        return this.idPresupuesto;
    }
    public getIdUsuario():number{
        return this.idUsuario;
    }
    public setFecha(fecha:Date){
        this.fecha=fecha;
    }
    public setTotal(total:number){
        this.total=total;
    }
}