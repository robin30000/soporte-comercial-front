import { Injectable } from '@angular/core';
import { VentasInstaleTienda } from '../interfaces/ventasInstale';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VentaInstaleService {

  httpOptions: object;
  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }
  guardaPedido(pedido: VentasInstaleTienda): Observable<any> {
    const data = { 'method': 'guardaPedidoVentaInstale', 'data': pedido }
    let host = location.host
    let server;

    if(host === 'adsl200-13-250-190.epm.net.co'){
      server = this.http.post<any>(`http://200.13.250.190/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`,data);
    }else{
      server = this.http.post<any>(`http://10.100.88.2/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
    }

    return server
  }

  buscaPedido(pedido: string): Observable<any> {
    const data = {'method' : 'consultaPedido', 'data' : pedido}

    let host = location.host
    let server;
    if(host === 'adsl200-13-250-190.epm.net.co'){
      server = this.http.post<any>(`http://200.13.250.190/visitas-terreno/api/Controllers/visitasTerrenoCtrl.php`,data);
    }else{
      server = this.http.post<any>(`http://10.100.88.2/visitas-terreno/api/Controllers/visitasTerrenoCtrl.php`, data);
    }

    return server

  }

  public respuestasPedidos(pageNumber: Number, pageSize: Number, login: string, pedido: Number): Observable<any> {
    const data = { 'method': 'respuestasPedidos', 'data':{ 'login' : login, 'pageNumber' : pageNumber, 'pageSize': pageSize ,'pedido': pedido}};
    let host = location.host
    let server;

    if(host === 'adsl200-13-250-190.epm.net.co'){
      server = this.http.post<any>(`http://200.13.250.190/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`,data);
    }else{
      server = this.http.post<any>(`http://10.100.88.2/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
    }

    return server
  }

  public validaTecnico(documento_tecnico: any): Observable<any> {
    const data = { 'method': 'documento_tecnico', 'data':{ 'documento_tecnico' : documento_tecnico}};
    let host = location.host
    let server;

    if(host === 'adsl200-13-250-190.epm.net.co'){
      server = this.http.post<any>(`http://200.13.250.190/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`,data);
    }else{
      server = this.http.post<any>(`http://10.100.88.2/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
    }
    return server
  }

  public observacionesDespacho():Observable<any>{
    const data = { 'method': 'observaciones'};
    let host = location.host
    let server;
    if(host === 'adsl200-13-250-190.epm.net.co'){
      server = this.http.post<any>(`http://200.13.250.190/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`,data);
    }else{
      server = this.http.post<any>(`http://10.100.88.2/seguimientopedidos-dev/api/controller/ventaInstaleCtrl.php`, data);
    }
    return server
  }
}
