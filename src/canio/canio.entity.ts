import Accesorio from "src/accesorios/Accesorio.entity";
import Consumo from "src/consumo/consumo.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('canio')
export default class Canio {
    @PrimaryColumn()
    private idCanio:number;
    @Column()
    private nombre:string;

    // @OneToMany(type => Accesorio,accesorios => accesorios.canio)
    // public accesorios:Accesorio[];

    @OneToOne(type => Consumo, consumo => consumo.canio)
    public consumo:Consumo;
    
    constructor(idCanio:number, nombreCanio:string){
        this.idCanio=idCanio;
        this.nombre=nombreCanio;
    }

    //GETTERS

    public getIdCanio() :number{
        return this.idCanio
    };
    public getNombreCanio() :string{
        return this.nombre
    };

    //SETTERS

    public setIdCanio(newIdCanio:number) :void {
        this.idCanio = newIdCanio;
    };
    public setNombreCanio(newNombreCanio:string) :void{
        this.nombre = newNombreCanio;
    };
}