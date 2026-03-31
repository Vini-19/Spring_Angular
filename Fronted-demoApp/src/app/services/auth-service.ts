import { Injectable, ValueProvider } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-resquest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = `${environment.apiUrl}/demoAPI/usuarios`

  /**
   *
   */
  constructor(private http : HttpClient) {}

login(data: LoginRequest) {
  return this.http.post<LoginResponse>(`${this.apiURL}/login`, data);
}

refreshToken() {
  return this.http.post<{ accessToken: string }>(`${this.apiURL}/refreshToken`, {
    refreshToken: this.obtenerRefreshToken()
  });
}

guardarToken(token: string): void {
  localStorage.setItem('token', token);
}

obtenerToken(): string | null {
  return localStorage.getItem('token');
}

guardarRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', token);
}

estaAutenticado(): boolean {
  return !!localStorage.getItem('token');
}


obtenerRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

guardarNombre(nombre: string): void {
  localStorage.setItem('nombre', nombre);
}

obtenerNombre(): string | null {
  return localStorage.getItem('nombre');
}

logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('nombre');
}
  
}
