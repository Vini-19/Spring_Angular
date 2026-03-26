import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


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
  constructor(private authService: AuthService, private router: Router) {}

  login(): void{
    this.error = "";
    const loginData ={
      nombre : this.nombre,
      password : this.password
    };
    
    this.authService.login(loginData).subscribe({
      next: (response) => {
        this.authService.guardarToken(response.token);
        this.authService.guardarNombre(response.nombre)

        console.log('Login Correcto');
        console.log('Token:', response.token);
        
        this.router.navigate(['/usuarios']);
      },
      error : (err) => {
        console.error(err);
        this.error = err.error || 'Error al iniciar';
      }
    })
  }

}
