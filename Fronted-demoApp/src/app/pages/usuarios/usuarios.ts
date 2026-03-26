import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDto } from '../../models/usuario-dto';
import { UsuarioService } from '../../services/usuarioService';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.html'
})
export class Usuarios implements OnInit {

  usuarios: UsuarioDto[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error(err)
    });
  }
}