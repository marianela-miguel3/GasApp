import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('consumo')
export default class Consumo {
    @PrimaryColumn()
    private idConsumo:number;
    @Column()
    private longitud:number;
    @Column()
    private cantidad_consumo:number;
    @Column()
    private diametro_canio:number;

    constructor(idConsumo:number, longConsumo:number, cantConsumo:number, diamCanio:number) {
        this.idConsumo = idConsumo;
        this.longitud = longConsumo;
        this.cantidad_consumo = cantConsumo;
        this.diametro_canio = diamCanio;
    };

    //GETTERS

    public getIdConsumo():number{
        return this.idConsumo;
    };

    public getLongitud():number {
        return this.longitud;
    };

    public getCantConsumo():number {
        return this.cantidad_consumo;
    };

    public getDiamCanio():number {
        return this.diametro_canio
    };
    //SETTERS
    public setIdConsumo(newIdConsumo:number):void {
        this.idConsumo = newIdConsumo;
    };
    
    public setLongitud(newLongitud:number):void {
        this.longitud = newLongitud;
    };

    public setCantConsumo(newCantConsumo:number):void {
        this.cantidad_consumo = newCantConsumo;
    };

    public setDiamCanio(newDiamCanio:number):void {
        this.diametro_canio = newDiamCanio;
    };
};