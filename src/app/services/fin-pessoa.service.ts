import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinPessoa } from '../models/fin-pessoa';

@Injectable({
  providedIn: 'root'
})
export class FinPessoaService {

  private apiUrl = 'http://sua-api-aqui.com/api/fin_pessoas';

  constructor(private http: HttpClient) { }

  getFinPessoas(): Observable<FinPessoa[]> {
    return this.http.get<FinPessoa[]>(this.apiUrl);
  }

  getFinPessoa(id: number): Observable<FinPessoa> {
    return this.http.get<FinPessoa>(`${this.apiUrl}/${id}`);
  }

  createFinPessoa(finPessoa: FinPessoa): Observable<FinPessoa> {
    return this.http.post<FinPessoa>(this.apiUrl, finPessoa);
  }

  updateFinPessoa(finPessoa: FinPessoa): Observable<FinPessoa> {
    return this.http.put<FinPessoa>(`${this.apiUrl}/${finPessoa.pes_codigo}`, finPessoa);
  }

  deleteFinPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
