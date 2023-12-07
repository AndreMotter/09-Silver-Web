import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinCategoria } from '../models/fin-categoria';

@Injectable({
  providedIn: 'root'
})
export class FinCategoriaService {

  constructor(private http: HttpClient) { }

  listarFinCategorias(cat_sigla: string, first: number, rows: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('cat_sigla', cat_sigla || '');
    params = params.set('first', first);
    params = params.set('rows', rows);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Categoria/Lista`, {params});
  }

  listarSelectFinCategorias(pes_codigo: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('pes_codigo', pes_codigo);
    return this.http.get<any>(`${environment.apiUrl}/Fin_Categoria/ListaSelect`, {params});
  }

  buscarPorIdFinCategoria(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Fin_Categoria/BuscaPorId?id=${id}`);
  }

  salvarFinCategoria(FinCategoria: FinCategoria): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Fin_Categoria/Salvar`, FinCategoria);
  }

  alterarFinCategoria(FinCategoria: FinCategoria): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/${FinCategoria.cat_codigo}`, FinCategoria);
  }

  deletarFinCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Fin_Categoria/Remover?id=${id}`);
  }
}
