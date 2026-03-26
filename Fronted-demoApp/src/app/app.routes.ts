import { Routes } from '@angular/router';
import { Usuarios } from './pages/usuarios/usuarios';

export const routes: Routes = [
    {path: "", redirectTo: 'login', pathMatch: "full"},
    {path: "usuarios", component : Usuarios}
];
