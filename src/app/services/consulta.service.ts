import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, async, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  httpOptions: object;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  consultaVisitasTerreno(pedido: string, cedula: string): Observable<any> {
    const data = { 'method': 'VisitasTerreno', 'data': { 'pedido': pedido, 'cedula': cedula } };
    return this.http.post<any>(`http://seguimientopedido.tigo.com.co/visitas-terreno/api/Controllers/consultasCtrl.php`, data);;
  }

  consultaEquiposInstalados(pedido: string): Observable<any> {
    const data = { 'method': 'EquiposInstalados', 'data': { 'pedido': pedido } };
    return this.http.post<any>(`http://seguimientopedido.tigo.com.co/visitas-terreno/api/Controllers/consultasCtrl.php`, data);;
  }

  consultaIncompleto(pedido: string): Observable<any> {
    const data = { 'method': 'Incompleto', 'data': { 'pedido': pedido } };
    return this.http.post<any>(`http://seguimientopedido.tigo.com.co/visitas-terreno/api/Controllers/consultasCtrl.php`, data);;
  }

  consultaSupervisor(cedula: string): Observable<any> {
    const data = { 'method': 'Supervisor', 'data': { 'cedula': cedula } };
    return this.http.post<any>(`http://seguimientopedido.tigo.com.co/visitas-terreno/api/Controllers/consultasCtrl.php`, data);;
  }
}
