import Accesorio from "src/accesorios/Accesorio.entity";
import Tramo from "src/tramo/tramo.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity("tramosaccesorios")
export default class TramoAccesorio{
@PrimaryGeneratedColumn()
private idTramoAccesorio:number;
@Column()
private cantidad:number;
@Column()
private equivalenteTramo:number;
@Column()
private tramo_precio_accesorio:number;

@ManyToOne(type => Tramo, tramo => tramo.tramoAccesorios, {
    onDelete: 'CASCADE',
})
@JoinColumn({name:'idTramo'})
public tramo:Tramo;

@ManyToOne(type => Accesorio, accesorio => accesorio.tramoAccesorios)
@JoinColumn({name:'idAccesorio'})
public accesorio:Accesorio;
constructor(idTramo:Tramo,idAccesorio:Accesorio,cantidad:number,equivalenteTramo:number,tramo_precio_accesorio:number){
    //this.idTramoAccesorio=idTramoAccesorio;
    this.tramo=idTramo;
    this.accesorio=idAccesorio;
    this.cantidad=cantidad;
    this.equivalenteTramo=equivalenteTramo;
    this.tramo_precio_accesorio=tramo_precio_accesorio;
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
public getPrecioTramo():number{
    return this.tramo_precio_accesorio;
}
public setCantidad(cantidadNuevo:number):void{
    this.cantidad=cantidadNuevo;
}
public setEquivalenteTramo(equivalenteNuevo:number):void{
    this.equivalenteTramo=equivalenteNuevo;
}
public setTramo(tramoNuevo:Tramo):void{
    this.tramo=tramoNuevo;
}
public setAccesorio(accesorioNuevo:Accesorio):void{
    this.accesorio=accesorioNuevo;
}
}

