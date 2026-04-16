import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from '../models/usuario-dto';
import { CrearUsuarioDto } from '../models/crearUsuarioDto';
import { Observable } from 'rxjs';
import { ActualizarUsuarioDto } from '../models/ActualizarUsuarioDto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiURL = `${environment.apiUrl}/demoAPI/usuarios`

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get<UsuarioDto[]>(`${this.apiURL}/Usuarios`);
  }

  obtenerPorId(id: number) {
    return this.http.get<UsuarioDto>(`${this.apiURL}/${id}`);
  }

  buscar(nombre?: string, apellido?: string) {
    let params: any = {};
    if (nombre) {
      params.nombre = nombre;
    }
    if (apellido) {
      params.apellido = apellido;
    }
    return this.http.get<UsuarioDto[]>(`${this.apiURL}/buscar`, { params });
  }

  crearUsuario(dto: CrearUsuarioDto): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/CrearUsuario`, dto);
  }

  actualizarUsuario(dto: ActualizarUsuarioDto, id: number): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/editar/${id}`, dto);
  }

  desactivarUsuario(id: number, estado: boolean) {
    return this.http.patch(`${this.apiURL}/desactivar/${id}?estado=${estado}`, {});
  }
}
