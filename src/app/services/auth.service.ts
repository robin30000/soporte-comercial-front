import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions: object;

  constructor(private http: HttpClient) {

    // opciones de http para indicar que se usara el formato JSON para la comunicación con el API
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }
  login(user: Object,): Observable<any>{
    let data = {method:'Login',data:user}

    let host = location.host;
    let server;

    if (host == 'localhost:4200') {
      server = this.http.post<any>( `http://10.100.88.2/visitas-terreno/api/Controllers/Auth.php`,data, this.httpOptions);
    }else if (host == '10.100.88.2') {
      server = this.http.post<any>( `http://10.100.88.2/visitas-terreno/api/Controllers/Auth.php`,data, this.httpOptions);
    }else{
      server = this.http.post<any>( `http://200.13.250.190/visitas-terreno/api/Controllers/Auth.php`,data, this.httpOptions);
    }

    console.log(location);
    
    return server

  }
}
