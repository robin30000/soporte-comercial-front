import { Injectable } from '@angular/core';
import { VentasInstaleTienda } from '../interfaces/ventasInstale';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VentaInstaleService {

  constructor(private http: HttpClient) { }

  host = location.host;


  guardaPedido(pedido: VentasInstaleTienda): Observable<any> {
    const data = { 'method': 'guardaPedidoVentaInstale', 'data': pedido }
    return this.http.post(`http://${this.host}/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
  }

  buscaPedido(pedido: string): Observable<any> {
    const data = { 'method': 'buscaPedido', 'data': pedido }
    return this.http.post<any>(`http://${this.host}/visitas-terreno/api/Controllers/Auth.php`, data);
  }

  public respuestasPedidos(pageNumber: Number, pageSize: Number, login: string, pedido: Number): Observable<any> {
    const data = { 'method': 'respuestasPedidos', 'data': { 'login': login, 'pageNumber': pageNumber, 'pageSize': pageSize, 'pedido': pedido } };
    return this.http.post<any>(`http://${this.host}/visitas-terreno/api/Controllers/Auth.php`, data);
  }

  public validaTecnico(documento_tecnico: any): Observable<any> {
    const data = { 'method': 'documento_tecnico', 'data': { 'documento_tecnico': documento_tecnico } };
    return this.http.post<any>(`http://${this.host}/visitas-terreno/api/Controllers/Auth.php`, data);
  }

  public observacionesDespacho(): Observable<any> {
    const data = { 'method': 'observaciones' };
    return this.http.post<any>(`http://${this.host}/visitas-terreno/api/Controllers/Auth.php`, data);
  }
}
