import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinPessoa } from '../models/fin-pessoa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinPessoaService {

  constructor(private http: HttpClient) { }

  listarFinPessoas(): Observable<FinPessoa[]> {
    return this.http.get<FinPessoa[]>(`${environment.apiUrl}/Fin_Pessoa/Lista`);
  }

  buscarPorIdFinPessoa(id: number): Observable<FinPessoa> {
    return this.http.get<FinPessoa>(`${environment.apiUrl}/Fin_Pessoa/BuscaPorId?id=${id}`);
  }

  salvarFinPessoa(finPessoa: FinPessoa): Observable<FinPessoa> {
    return this.http.post<FinPessoa>(`${environment.apiUrl}/Fin_Pessoa/Salvar`, finPessoa);
  }

  alterarFinPessoa(finPessoa: FinPessoa): Observable<FinPessoa> {
    return this.http.put<FinPessoa>(`${environment.apiUrl}/${finPessoa.pes_codigo}`, finPessoa);
  }

  deletarFinPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Fin_Pessoa/Remover?id=${id}`);
  }
}
