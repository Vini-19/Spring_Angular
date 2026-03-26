import { Routes } from '@angular/router';
import { Usuarios } from './pages/usuarios/usuarios';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: "", redirectTo: 'login', pathMatch: "full"},
    {path: "login", component: Login},
    {path: "usuarios", component : Usuarios, canActivate: [authGuard]}
];
