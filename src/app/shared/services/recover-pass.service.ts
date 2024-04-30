import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/shared/baseURL';

@Injectable({
  providedIn: 'root',
})
export class RecoverPassService {
  httpOptions: object;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public recoverPass(datos: Object): Observable<any> {
    const data = { method: 'recoverPass', data: datos };
    return this.http.post<any>(
      `${baseURL}/Controllers/Auth.php`,
      data,
      this.httpOptions
    );
  }
}
