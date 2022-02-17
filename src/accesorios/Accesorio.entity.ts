import TramoAccesorio from "src/tramoaccesorio/TramoAccesorio.entity";
import {Column, Entity, OneToMany,PrimaryColumn} from "typeorm";

@Entity("accesorios")
export default class Accesorio{
@PrimaryColumn()
private idAccesorio:number;
@Column()
nombre_accesorio:string;
@Column()
diametro:string;
@Column()
equivalente:number;
@Column()
private precio:number;

@OneToMany(type => TramoAccesorio, tramoAccesorios => tramoAccesorios.accesorio)
public tramoAccesorios:TramoAccesorio[];


constructor(idAccesorio:number,nombre_accesorio:string,diametro:string,equivalente:number,precio:number){
this.idAccesorio=idAccesorio;
this.nombre_accesorio=nombre_accesorio;
this.diametro=diametro;
this.equivalente=equivalente;
this.precio=precio;
}
public getIdAccesorio():number{
    return this.idAccesorio;
}
public setPrecio(precioNuevo:number):void{
    this.precio=precioNuevo;
}
public getDiametro():string{
    return this.diametro;
}
public getEquivalente():number{
    return this.equivalente;
}
public getPrecio():number{
    return this.precio;
}

}

