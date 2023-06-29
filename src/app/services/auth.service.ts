import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions: object;

  constructor(private http: HttpClient) {

    // opciones de http para indicar que se usara el formato JSON para la comunicación con el API
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  login(user: Object,): Observable<any> {
    let data = { method: 'Login', data: user }
    return this.http.post<any>(`http://seguimientopedido.tigo.com.co/visitas-terreno/api/Controllers/Auth.php`, data, this.httpOptions);
  }
}
