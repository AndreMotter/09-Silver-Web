import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinCategoria } from '../models/fin-categoria';

@Injectable({
  providedIn: 'root'
})
export class FinCategoriaService {

  constructor(private http: HttpClient) { }

  listarFinCategorias(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Fin_Categoria/Lista`);
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
