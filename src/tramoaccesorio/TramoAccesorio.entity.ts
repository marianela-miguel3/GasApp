import Accesorio from "src/accesorios/Accesorio.entity";
import Tramo from "src/tramo/tramo.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity("tramosaccesorios")
export default class TramoAccesorio{
@PrimaryGeneratedColumn()
private idTramoAccesorio:number;
@Column()
private idTramo:number;
// @Column()
// private idAccesorio:number;
@Column()
private cantidad:number;
@Column()
private equivalenteTramo:number;

@ManyToOne(type => Tramo, tramo => tramo.tramoAccesorios)
@JoinColumn({name:'idTramo'})
public tramo:Tramo[];

@ManyToOne(type => Accesorio, accesorio => accesorio.tramoAccesorios)
@JoinColumn({name:'idAccesorio'})
public accesorio:Accesorio;

constructor(idTramo:number,idAccesorio:Accesorio,cantidad:number,equivalenteTramo:number){
    //this.idTramoAccesorio=idTramoAccesorio;
    this.idTramo=idTramo;
    this.accesorio=idAccesorio;
    this.cantidad=cantidad;
    this.equivalenteTramo=equivalenteTramo;
}
public getIdTramoAccesorio():number{
    return this.idTramoAccesorio;
}
public getCantidad():number{
    return this.cantidad;
}
public getEquivalenteTramo():number{
    return this.equivalenteTramo;
}
public setCantidad(cantidadNuevo:number):void{
    this.cantidad=cantidadNuevo;
}
public setEquivalenteTramo(equivalenteNuevo:number):void{
    this.equivalenteTramo=equivalenteNuevo;
}
public setTramo(tramoNuevo:number):void{
    this.idTramo=tramoNuevo;
}
public setAccesorio(accesorioNuevo:Accesorio):void{
    this.accesorio=accesorioNuevo;
}
}

