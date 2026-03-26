import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  nombre : string = "";
  password : string = "";
  error: string = '';

  /**
   *
   */
  constructor(private authService: AuthService, private router: Router, private toastr : ToastrService) {}

  login(): void{
    
    if(!this.nombre || !this.password){
      this.toastr.warning('Ingrese usuario y contraseña');
      return;
    }

    const loginData ={
      nombre : this.nombre,
      password : this.password
    };
    
    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.authService.guardarToken(response.token);
        this.authService.guardarNombre(response.nombre)

        this.toastr.success('Bienvenido '+ response.nombre);
        
        this.router.navigate(['/home']);
      },
      error : (err) => {
        this.toastr.error(err.error || 'Error al iniciar sesión')
      }
    })
  }

}
