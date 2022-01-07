import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('canio')
export default class Canio {
    @PrimaryColumn()
    private idCanio:number;
    @Column()
    private nombre:string;
    
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