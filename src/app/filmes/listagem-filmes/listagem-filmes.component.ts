import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[];

  constructor(private filmeService: FilmesService) { }

  ngOnInit() {
    this.filmeService.listar().subscribe(
      (filmes: Filme[]) => this.filmes = filmes
    );
  }

}
