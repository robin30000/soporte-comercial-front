import { Injectable } from '@angular/core';
import { VentasInstaleTienda } from '../interfaces/ventasInstale';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VentaInstaleService {

  constructor(private http: HttpClient) { }

  guardaPedido(pedido: VentasInstaleTienda): Observable<any> {
    const data = { 'method': 'guardaPedidoVentaInstale', 'data': pedido }
    return this.http.post(`http://netvm-ptctrl01/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
  }

  buscaPedido(pedido: string): Observable<any> {
    const data = { 'method': 'buscaPedido', 'data': pedido }
    return this.http.post(`http://10.100.66.254:8080/seguimientosApi/controllers/seguimientosCtrl.php/`, data);
  }

  public respuestasPedidos(pageNumber: Number, pageSize: Number, login: string): Observable<any> {
    const data = { 'method': 'respuestasPedidos', 'data':{ 'login' : login, 'pageNumber' : pageNumber, 'pageSize': pageSize }};
    return this.http.post(`http://netvm-ptctrl01/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
  }

}
