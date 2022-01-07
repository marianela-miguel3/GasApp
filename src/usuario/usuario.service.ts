import Usuario from './usuario.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UsuarioDTO from './UsuarioDTO';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario) private readonly repoUsuario:Repository<Usuario>)
{}

public async getUsuarios() : Promise<Usuario[]> {    
    try {
        const usuarios: Usuario[] = await this.repoUsuario.find()
        return usuarios;          
    } catch (error) {
        throw new HttpException( { error : `Error buscando los usuarios: ${error}`}, HttpStatus.NOT_FOUND);
    }  
}

public async getUsuario(id: number): Promise<Usuario> {
    try{
      const usuario: Usuario= await this.repoUsuario.findOne(id)
      return usuario;
    } catch (error){
      throw new HttpException( { error : `Error buscando el id ingresado: ${error}`}, HttpStatus.NOT_FOUND);
    }
  }

  public async addUsuario(usuario: UsuarioDTO): Promise<Usuario[]>{
    try{
      let usuarioNuevo= new Usuario(usuario.idUsuario,usuario.nombre,usuario.contraseña,usuario.domicilio,usuario.telefono,usuario.email);
      await this.repoUsuario.save(usuarioNuevo);
      const usuarios: Usuario[]=await this.repoUsuario.find()
      return usuarios;
    } catch(error){
      throw new HttpException( {error: `Error agregando nuevo usuario: ${error}`}, HttpStatus.NOT_FOUND);
    }
   }

   public async updateUsuario(usuario:UsuarioDTO):Promise<Usuario[]>{
    try{
      const usuarioActualizado: Usuario=await this.repoUsuario.findOne(usuario.idUsuario);
      if(!usuarioActualizado){
        throw new HttpException({ error: `error buscando el usuario de id ${usuario.idUsuario}`}, HttpStatus.NOT_FOUND);
      }
      usuarioActualizado.nombre;
      usuarioActualizado.setContraseña(usuario.contraseña);
      usuarioActualizado.setDomicilio(usuario.domicilio);
      usuarioActualizado.setTelefono(usuario.telefono);
      usuarioActualizado.setEmail(usuario.email);
      await this.repoUsuario.save(usuarioActualizado);
      const usuarios: Usuario[]= await this.repoUsuario.find()
      return usuarios;
    } catch (error){
      throw new HttpException( {error: `Error modificando el usuario de id ${usuario.idUsuario}`},HttpStatus.NOT_FOUND);
    }
    }

    public async delUsuario(id:number): Promise<Usuario[]>{
        try{
          const usuario:Usuario= await this.repoUsuario.findOne(id);
          if(!usuario){
            throw new HttpException( { error: `error buscando el usuario de id ${id}`}, HttpStatus.NOT_FOUND);
          }
          await this.repoUsuario.delete(usuario);
          const usuarios: Usuario[]= await this.repoUsuario.find()
          return usuarios;
        }catch (error){
          throw new HttpException( { error: `error buscando el usuario de id ${id}`}, HttpStatus.NOT_FOUND);
        }
     }

}
