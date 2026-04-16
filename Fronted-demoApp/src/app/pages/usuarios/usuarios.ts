import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDto } from '../../models/usuario-dto';
import { UsuarioService } from '../../services/usuarioService';
import { RouterLink } from "@angular/router";
import { UsuariosModalComponent } from './usuarios-modal/usuarios-modal.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, UsuariosModalComponent],
  templateUrl: './usuarios.html'
})
export class Usuarios implements OnInit {

  usuarios: UsuarioDto[] = [];
  mostrarModal = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.recargarUsuarios();
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error(err)
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  recargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error(err)
    });
  }
}