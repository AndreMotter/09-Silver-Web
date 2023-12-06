import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinLoginService {

  constructor(private http: HttpClient) { }

  private autenticado: boolean = false;
  private dadosUsuario: any = {}; 

  login(finLogin: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Login/Logar`, finLogin);
  }

  getUserData(): any { 
    return this.dadosUsuario;
  }

  getUserId(): Number { 
    return this.dadosUsuario.pes_codigo;
  }

  setUserData(dadosUsuario: any): void { 
     this.dadosUsuario = dadosUsuario;
  }

  logout(): void {
    this.autenticado = false;
    this.dadosUsuario = {};
  }

  setLoggedIn(): void { 
     this.autenticado = true;
  }

  isLoggedIn(): boolean {
    return this.autenticado;
  }

}
