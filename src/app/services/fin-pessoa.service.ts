import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinPessoa } from '../models/fin-pessoa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinPessoaService {

  constructor(private http: HttpClient) { }

  listarFinPessoas(fil_nome: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('pessoa', fil_nome || '');
    params = params.set('status', 0);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Pessoa/Lista`, {params});
  }

  buscarPorIdFinPessoa(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Fin_Pessoa/BuscaPorId?id=${id}`);
  }

  salvarFinPessoa(finPessoa: FinPessoa): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Fin_Pessoa/Salvar`, finPessoa);
  }

  alterarFinPessoa(finPessoa: FinPessoa): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${finPessoa.pes_codigo}`, finPessoa);
  }

  deletarFinPessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Fin_Pessoa/Remover?id=${id}`);
  }
}
