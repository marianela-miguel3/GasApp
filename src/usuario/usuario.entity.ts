import Presupuesto from "src/presupuesto/presupuesto.entity";
import {Column, Entity, OneToMany,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("usuario")
export default class Usuario{
    @PrimaryGeneratedColumn()
    private idUsuario:number;
    @Column()
    nombre:string;
    @Column()
    contraseña:string;
    @Column()
    domicilio:string;
    @Column()
    telefono:number;
    @Column()
    email:string;

    @OneToMany(() =>Presupuesto, presupuesto => presupuesto.usuario)
    public presupuestos : Presupuesto[];
    
    constructor(nombre:string,contraseña:string,domicilio:string,telefono:number,email:string){
        // this.idUsuario=idUsuario; 
        this.nombre=nombre;
        this.contraseña=contraseña;
        this.domicilio=domicilio;
        this.telefono=telefono;
        this.email=email;
    }

    public getIdUsuario():number{
        return this.idUsuario;
    }
    public getNombre():string{
        return this.nombre;
    }
    public setNombre(nombreNuevo:string):void{
        this.nombre = nombreNuevo;
    }
    public setContraseña(contraseñaNueva:string):void{
        this.contraseña=contraseñaNueva;
    }
    public setDomicilio(domicilioNuevo):void{
        this.domicilio=domicilioNuevo;
    }
    public setTelefono(telefonoNuevo:number):void{
        this.telefono=telefonoNuevo;
    }
    public setEmail(emailNuevo:string):void{
        this.email=emailNuevo;
    }
}