import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/shared/baseURL';

@Injectable({
  providedIn: 'root',
})
export class PerfilMenuService {
  httpOptions: object;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public listMenu(): Observable<any> {
    const data = { method: 'listMenu' };

    return this.http.post<any>(
      `${baseURL}/Controllers/perfilMenuCtrl.php`,
      data
    );
  }

  public listPerfil(): Observable<any> {
    const data = { method: 'listPerfil' };

    return this.http.post<any>(
      `${baseURL}/Controllers/perfilMenuCtrl.php`,
      data
    );
  }

  public editaMenu(id: number, estado: string): Observable<any> {
    const data = { method: 'editaMenu', data: { menu: id, estado: estado } };

    return this.http.post<any>(
      `${baseURL}/Controllers/perfilMenuCtrl.php`,
      data
    );
  }

  public editaPerfil(id: number): Observable<any> {
    const data = { method: 'editaPerfil', data: { perfil: id } };

    return this.http.post<any>(
      `${baseURL}/Controllers/perfilMenuCtrl.php`,
      data
    );
  }

  public cambiaEstadoMenu(data: object): Observable<any> {
    const d = { method: 'cambiaEstadoMenu', data };

    return this.http.post<any>(
      `${baseURL}/Controllers/perfilMenuCtrl.php`,
      d
    );
  }
}
