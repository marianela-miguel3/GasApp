import {Column, Entity, OneToMany,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity("tramosaccesorios")
export default class TramoAccesorio{
@PrimaryGeneratedColumn()
private idTramoAccesorio:number;
@Column()
private idTramo:number;
@Column()
private idAccesorio:number;
@Column()
private cantidad:number;
@Column()
private equivalenteTramo:number;

constructor(idTramo:number,idAccesorio:number,cantidad:number,equivalenteTramo:number){
    //this.idTramoAccesorio=idTramoAccesorio;
    this.idTramo=idTramo;
    this.idAccesorio=idAccesorio;
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
public setAccesorio(accesorioNuevo:number):void{
    this.idAccesorio=accesorioNuevo;
}
}

