import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarioService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usuarios-modal.component.html',
  styleUrl: './usuarios-modal.component.css'
})
export class UsuariosModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() usuarioCreado = new EventEmitter<void>();

  usuario = {
    nombre: '',
    apellido: '',
    password: '',
    estado : true
  };

  closing = false;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {}

  cerrarModal() {
    this.closing = true;
    setTimeout(() => {
      this.cerrar.emit();
    }, 300); // Duración de la animación de cierre

  }

  GuardarUsuario() {
    this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: () => {
        this.usuarioCreado.emit();
        this.toastr.success('Usuario creado exitosamente');
        this.cerrar.emit();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al crear el usuario');
      }
    })
  }

}
