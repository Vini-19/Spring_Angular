import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuarioService';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Output, Input } from '@angular/core';

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
  @Input() usuarioEditar: any = null;

  usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    password: '',
    estado : true
  };

  esEdicion = false;
  closing = false;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) {}

  ngOnInit() {
    if(this.usuarioEditar){
      this.esEdicion = true;
      this.usuario = {
        id: this.usuarioEditar.id,
        nombre: this.usuarioEditar.nombre,
        apellido: this.usuarioEditar.apellido,
        password: '', // No se muestra la contraseña actual
        estado: this.usuarioEditar.estado
      }
    }
  }


  cerrarModal() {
    this.closing = true;
    setTimeout(() => {
      this.cerrar.emit();
    }, 300); // Duración de la animación de cierre

  }

  GuardarUsuario() {
    if(this.esEdicion){
      this.usuarioService.actualizarUsuario(this.usuario, this.usuario.id).subscribe({
        next: () =>{
          this.usuarioCreado.emit();
          this.toastr.success('Usuario ' + this.usuario.id + ' actualizado correctamente');
          this.cerrarModal();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error al actualizar el usuario');
        }
      });
    }else{
      this.usuarioService.crearUsuario(this.usuario).subscribe({
        next: () => {
          this.usuarioCreado.emit();
          this.toastr.success('Usuario creado correctamente');
          this.cerrarModal();
        },
        error : (err) => {
          console.error(err);
          this.toastr.error('Error al crear el usuario');
        }
      })
    }
  }
}
