import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/shared/baseURL';
import { GuardaUsuario } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrearUsuarioService {
  httpOptions: object;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  guardaUsuario(usuario: GuardaUsuario): Observable<any> {
    const data = { method: 'guarda-usuario', data: usuario };
    return this.http.post<any>(`${baseURL}/Controllers/usuarioCtrl.php`, data);
  }

  public editaUsuario(login: any): Observable<any> {
    const data = {
      method: 'editaUsuario',
      data: { login: login },
    };

    return this.http.post<any>(`${baseURL}/Controllers/usuarioCtrl.php`, data);
  }

  public deleteUsuario(login: any) {
    const data = {
      method: 'deleteUsuario',
      data: { login: login },
    };

    return this.http.post<any>(`${baseURL}/Controllers/usuarioCtrl.php`, data);
  }

  public listUsuario(
    pageNumber: Number,
    pageSize: Number,
    Cedula: string
  ): Observable<any> {
    const data = {
      method: 'listUsuario',
      data: { Cedula: Cedula, pageNumber: pageNumber, pageSize: pageSize },
    };

    return this.http.post<any>(`${baseURL}/Controllers/usuarioCtrl.php`, data);
  }
}
