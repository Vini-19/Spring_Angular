import { Component } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  nombreUsuario: string  = '';
  /**
   *
   */
  constructor(private authService : AuthService, private router : Router, private toastr: ToastrService) {
    this.nombreUsuario = this.authService.obtenernombre() || ''
  }

    logout(){
    this.authService.logout();
    this.toastr.success('Hasta luego ' + this.nombreUsuario +'!!')
    this.router.navigate(['/login']);
  }

}
