import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, NgClass,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  nombreUsuario: string = '';
  sidebarCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.nombreUsuario = this.authService.obtenerNombre() || '';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Hasta luego ' + this.nombreUsuario + '!!');
    this.router.navigate(['/login']);
  }
}