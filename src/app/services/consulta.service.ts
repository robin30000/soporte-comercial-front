import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  httpOptions: object;
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }

  consultaVisitasTerreno(pedido:string, cedula:string): Observable<any>{
    return this.http.get<any>(`http://10.100.66.254:8080/visitas-terreno/api/visitas-terreno/${pedido}/${cedula}`);
  }

  consultaEquiposInstalados(pedido:string): Observable<any>{
    return this.http.get<any>(`http://10.100.66.254:8080/visitas-terreno/api/equipos/${pedido}`);
  }

  consultaIncompleto(pedido:string): Observable<any>{
    return this.http.get<any>(`http://10.100.66.254:8080/visitas-terreno/api/incompleto/${pedido}`);
  }
}
