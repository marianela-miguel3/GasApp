import Presupuesto from "src/presupuesto/presupuesto.entity";
import {Column, Entity, OneToMany,PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity("usuario")
export default class Usuario{
    @PrimaryGeneratedColumn()
    private idUsuario:number;
    @Column()
    nombre:string;
    @Column()
    contrasenia:string;
    @Column()
    domicilio:string;
    @Column()
    telefono:number;
    @Column()
    email:string;

    @OneToMany(() =>Presupuesto, presupuesto => presupuesto.usuario)
    public presupuestos : Presupuesto[];
    
    constructor(nombre:string,contrasenia:string,domicilio:string,telefono:number,email:string){
        // this.idUsuario=idUsuario; 
        this.nombre=nombre;
        this.contrasenia=contrasenia;
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
    public setContrasenia(contraseniaNueva:string):void{
        this.contrasenia=contraseniaNueva;
    }
    public setDomicilio(domicilioNuevo:string):void{
        this.domicilio=domicilioNuevo;
    }
    public setTelefono(telefonoNuevo:number):void{
        this.telefono=telefonoNuevo;
    }
    public setEmail(emailNuevo:string):void{
        this.email=emailNuevo;
    }
}