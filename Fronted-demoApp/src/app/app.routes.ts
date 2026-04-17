import { Routes } from '@angular/router';
import { Usuarios } from './pages/usuarios/usuarios';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { HomeComponent } from './pages/home/home.component';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: "full" },

  { path: "login", component: Login },

  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      { path: "usuarios", component: Usuarios },
      { path: "inicio", component: Inicio },
    ]
  }
];