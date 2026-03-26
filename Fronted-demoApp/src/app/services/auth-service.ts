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

  login(data: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiURL}/login`,data);
  }

  guardarToken(token: string): void{
    localStorage.setItem('token',token);
  }
  
  obtenerToken(): string | null{
    return localStorage.getItem('token');
  }

  guardarNombre(nombre:string): void{
    localStorage.setItem('nombre',nombre);
  }

  obtenernombre(): string | null
  {
    return localStorage.getItem('nombre');
  }

  estaAutenticado(): boolean{
    return !!this.obtenerToken();
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
  }
  
}
