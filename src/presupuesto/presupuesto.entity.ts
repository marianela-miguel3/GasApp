import PresupuestoDeArtefactos from "src/presupuesto-de-artefactos/presupuesto-de-artefactos.entity";
import Usuario from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("presupuesto")
export default class Presupuesto{
    @PrimaryGeneratedColumn()
    private idPresupuesto:number;
    @Column()
    private fecha:Date;
    @Column()
    private total:number;
    // @Column()
    // private idUsuario:number;

    @ManyToOne(type => Usuario, usuario => usuario.presupuestos)
    @JoinColumn({name:"idUsuario"})
    public usuario:Usuario;

    // @OneToMany(type => PresupuestoDeArtefactos, presupuestoArtefactos => presupuestoArtefactos.presupuesto)
    // public presupuestoArtefactos: PresupuestoDeArtefactos[];

    public constructor(fecha:Date,total:number,idUsuario:Usuario){
        // this.idPresupuesto=idPresupuesto; 
        this.fecha=fecha;
        this.total=total;
        this.usuario=idUsuario;
    }
    public getIdPresupuesto():number{
        return this.idPresupuesto;
    }
    public getIdUsuario():Usuario{
        return this.usuario;
    }
    public setFecha(fecha:Date){
        this.fecha=fecha;
    }
    public setTotal(total:number){
        this.total=total;
    }
}