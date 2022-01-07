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
idCaño:number;
@Column()
private precio:number;

constructor(idAccesorio:number,nombre_accesorio:string,diametro:string,equivalente:number,idCaño:number,precio:number){
this.idAccesorio=idAccesorio;
this.nombre_accesorio=nombre_accesorio;
this.diametro=diametro;
this.equivalente=equivalente;
this.idCaño=idCaño;
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

}

