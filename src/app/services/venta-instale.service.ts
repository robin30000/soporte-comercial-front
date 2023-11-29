import { Injectable } from '@angular/core';
import { VentasInstaleTienda } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class VentaInstaleService {

  httpOptions: object;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  guardaPedido(pedido: VentasInstaleTienda): Observable<any> {
    const data = { 'method': 'guardaPedidoVentaInstale', 'data': pedido }
    return this.http.post<any>(`${baseURL}/Controllers/ventaInstaleCtrl.php`, data);
  }

  buscaPedido(pedido: string): Observable<any> {
    const data = { 'method': 'consultaPedido', 'data': pedido }
    return this.http.post<any>(`${baseURL}/Controllers/visitasTerrenoCtrl.php`, data);

  }

  public respuestasPedidos(pageNumber: Number, pageSize: Number, login: string, pedido: Number): Observable<any> {
    const data = { 'method': 'respuestasPedidos', 'data': { 'login': login, 'pageNumber': pageNumber, 'pageSize': pageSize, 'pedido': pedido } };

    return this.http.post<any>(`${baseURL}/Controllers/ventaInstaleCtrl.php`, data);
  }

  public validaTecnico(documento_tecnico: any): Observable<any> {
    const data = { 'method': 'documento_tecnico', 'data': { 'documento_tecnico': documento_tecnico } };
    return this.http.post<any>(`${baseURL}/Controllers/ventaInstaleCtrl.php`, data);
  }

  public observacionesDespacho(): Observable<any> {
    const data = { 'method': 'observaciones' };
    return this.http.post<any>(`${baseURL}/Controllers/ventaInstaleCtrl.php`, data);
  }

  public export(login: any): Observable<any> {
    const data = { 'method': 'export', 'data': { 'login': login } };
    return this.http.post<any>(`${baseURL}/Controllers/ventaInstaleCtrl.php`, data);
  }
}
