import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {
  API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obterProdutos():Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produtos`);
  }

  obterProdutoPorId(id: number):Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produtos/${id}`);
  }

  salvarProduto(produto: Produto):Observable<Produto> {
    return this.http.post<Produto>(`${this.API_URL}/produtos/`, produto);
  }

  editarProduto(produto: Produto):Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/produtos/${produto.id}`, produto);
  }

  excluirProduto(produto: Produto):Observable<Produto> {
    return this.http.delete<Produto>(`${this.API_URL}/produtos/${produto.id}`);
  }
}
