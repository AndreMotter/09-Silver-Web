import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinContaBancariaService {

  constructor(private http: HttpClient) { }

  listarSelectFinContaBancariaService(pes_codigo: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('pes_codigo', pes_codigo);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Conta_Bancaria/ListaSelect`, {params});
  }
}
