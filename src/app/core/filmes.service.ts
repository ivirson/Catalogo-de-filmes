import { Filme } from './../shared/models/filme';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/filmes';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  public salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  public listar(): Observable<Filme[]> {
    return this.http.get<Filme[]>(url);
  }
}
