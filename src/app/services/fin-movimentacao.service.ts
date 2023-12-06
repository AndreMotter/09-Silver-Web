import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinMovimentacao } from '../models/fin-movimentacao';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FinMovimentacaoService {

  constructor(private http: HttpClient) { }

  listarFinMovimentacoes(filtro_mov_tipo: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('mov_tipo', filtro_mov_tipo || 0);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Movimentacao/Lista`,  { params });
  }

  buscarPorIdFinMovimentacao(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Fin_Movimentacao/BuscaPorId?id=${id}`);
  }

  salvarFinMovimentacao(FinMovimentacao: FinMovimentacao): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Fin_Movimentacao/Salvar`, FinMovimentacao);
  }

  alterarFinMovimentacao(FinMovimentacao: FinMovimentacao): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${FinMovimentacao.pes_codigo}`, FinMovimentacao);
  }

  deletarFinMovimentacao(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Fin_Movimentacao/Remover?id=${id}`);
  }

  resumoMensalFinMovimentacao(pes_codigo: number, mes_ano: Date): Observable<any> {
    let mesFormatado = mes_ano.toISOString().split('T')[0];
    let params = new HttpParams();
    params = params.append('pes_codigo', pes_codigo);
    params = params.append('mes_ano', mesFormatado);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Movimentacao/ResumoMensal`,  { params });
  }

  resumoAnualFinMovimentacao(pes_codigo: number, ano: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pes_codigo', pes_codigo);
    params = params.append('ano', ano);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Movimentacao/ResumoAnual`,  { params });
  }
}
