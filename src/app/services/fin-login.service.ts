import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FinLogin } from '../models/fin-login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinLoginService {

  constructor(private http: HttpClient) { }

  login(finLogin: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Login/Login`, finLogin);
  }

}
