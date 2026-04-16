import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioDto } from '../../models/usuario-dto';
import { UsuarioService } from '../../services/usuarioService';
import { RouterLink } from "@angular/router";
import { UsuariosModalComponent } from './usuarios-modal/usuarios-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UsuariosModalComponent],
  templateUrl: './usuarios.html'
})
export class Usuarios implements OnInit {

  usuarios: UsuarioDto[] = [];
  mostrarModal = false;
  usuarioSeleccionado: any = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.recargarUsuarios();
  }

  abrirModal() {
    this.usuarioSeleccionado = null;
    this.mostrarModal = true;
  }

  abrirModalEdicion(usuario: any) {
    this.usuarioSeleccionado = { ...usuario }; // Crear una copia para evitar mutaciones directas
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
  }

  recargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => console.error(err)
    });
  }

  DesactivarUsuario(usuario: any) {
    const nuevoEstado = !usuario.estado;
    Swal.fire({
      title: usuario.estado
        ? `¿Deseas desactivar al usuario "${usuario.nombre}"?`
        : `¿Deseas activar al usuario "${usuario.nombre}"?`,
      text: 'El estado del usuario será actualizado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: usuario.estado ? '#d33' : '#198754',
      cancelButtonColor: '#3085d6',
      confirmButtonText: usuario.estado ? 'Sí, desactivar' : 'Sí, activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.desactivarUsuario(usuario.id, nuevoEstado).subscribe({
          next: () => {
            Swal.fire(
              'Éxito',
              usuario.estado ? 'Usuario desactivado correctamente.' : 'Usuario activado correctamente.',
              'success'
            );
            this.recargarUsuarios();
          },
          error: (err) => {
            console.error(err);
            Swal.fire(
              'Error',
              'No se pudo actualizar el estado del usuario.',
              'error'
            );
          }
        });
      }
    });
  }

}