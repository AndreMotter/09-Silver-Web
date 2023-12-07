import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinPessoaService {

  constructor(private http: HttpClient) { }

  listarFinPessoas(fil_nome: string, fil_cpf: string, fil_ativo: number,first: number, rows: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('pessoa', fil_nome || '');
    params = params.set('cpf', fil_cpf || '');
    params = params.set('status', fil_ativo || 0);
    params = params.set('first', first);
    params = params.set('rows', rows);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Pessoa/Lista`, {params});
  }

  buscarPorIdFinPessoa(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Fin_Pessoa/BuscaPorId?id=${id}`);
  }

  salvarFinPessoa(finPessoa: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Fin_Pessoa/Salvar`, finPessoa);
  }

  alterarFinPessoa(finPessoa: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${finPessoa.pes_codigo}`, finPessoa);
  }

  deletarFinPessoa(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Fin_Pessoa/Remover?id=${id}`);
  }
}
