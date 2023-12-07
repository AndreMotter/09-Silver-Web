import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FinMovimentacaoService {

  constructor(private http: HttpClient) { }

  listarFinMovimentacoes(filtro_mov_tipo: number, pes_codigo: number, filtro_categoria_selecionada: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('mov_tipo', filtro_mov_tipo || 0);
    params = params.set('pes_codigo', pes_codigo);
    if(filtro_categoria_selecionada) { params = params.set('cat_codigo', filtro_categoria_selecionada.value); } else { params = params.set('cat_codigo', 0); }
    return this.http.get<any>(`${environment.apiUrl}/Fin_Movimentacao/Lista`,  { params });
  }

  buscarPorIdFinMovimentacao(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Fin_Movimentacao/BuscaPorId?id=${id}`);
  }

  salvarFinMovimentacao(FinMovimentacao: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Fin_Movimentacao/Salvar`, FinMovimentacao);
  }

  alterarFinMovimentacao(FinMovimentacao: any): Observable<any> {
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

  imprimirFinMovimentacao(pes_codigo: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pes_codigo', pes_codigo);
    return this.http.get<any>(`${environment.apiUrl}/Fin_relatorios/ImprimirMovimentos`,  { params });
  }
}
