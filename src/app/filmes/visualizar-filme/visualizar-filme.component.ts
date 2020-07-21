import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {

  semFoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7GpbN3UDBr906iiXrTpK2veDQKZcDSbyvXQ&usqp=CAU';
  filme: Filme;

  constructor(private activedRoute: ActivatedRoute,
              private filmesService: FilmesService) { }

  ngOnInit(): void {
    this.visualizarFilme(this.activedRoute.snapshot.params['id']);
  }

  private visualizarFilme(id: number): void {
    this.filmesService.visualizar(id).subscribe((filme: Filme) => {
      this.filme = filme;
      console.log(filme);
    });
  }

}
