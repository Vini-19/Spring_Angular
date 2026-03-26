import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../models/usuario-dto';
import { UsuarioService } from '../../services/usuarioService';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [NgFor],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  usuarios: UsuarioDto[] = [];
  constructor(private usuarioService: UsuarioService ){}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next : (data) =>{
        this.usuarios = data;
        console.log(data);
      },
      error : (err) => console.error(err)
    })
  }
}
