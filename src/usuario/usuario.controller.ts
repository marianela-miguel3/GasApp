import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Usuario from './usuario.entity';
import { UsuarioService } from './usuario.service';
import UsuarioDTO from './UsuarioDTO';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService:UsuarioService){}

    @Get()
    public async getUsuarios():Promise<Usuario[]>{
        return await this.usuarioService.getUsuarios();
    }
    @Get(`:id`)
    public async getUsuari(@Param(`id`) id:string):Promise<Usuario>{
        return await this.usuarioService.getUsuario(parseInt(id));
    }
    @Post()
    public async addUsuario(@Body() usuarioDto:UsuarioDTO): Promise<Usuario[]>{
        return await this.usuarioService.addUsuario(usuarioDto);
    }
    @Put()
    public async updateUsuario(@Body() usuarioDTO:UsuarioDTO):Promise<Usuario[]>{
        return await this.usuarioService.updateUsuario(usuarioDTO);
    }

    @Delete(`:id`)
    public delUsuario(@Param(`id`) id:string):Promise<Usuario[]>{
        return this.usuarioService.delUsuario(parseInt(id));
    }
}
