import { ConfigParams } from './../../shared/models/config-params';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  semFoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7GpbN3UDBr906iiXrTpK2veDQKZcDSbyvXQ&usqp=CAU';
  config: ConfigParams = {
    pagina: 0,
    limite: 4
  };
  filmes: Filme[] = [];
  texto: string;
  genero: string;
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmeService: FilmesService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe(
      (val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      }
    );

    this.filtrosListagem.get('genero').valueChanges.subscribe(
      (val: string) => {
        this.config.campo = {tipo: 'genero', valor: val};
        this.resetarConsulta();
      }
    );

    this.generos = ['Ação', 'Aventura', 'Romance', 'Terror', 'Ficção científica', 'Comédia', 'Drama', 'Mistério'];

    this.listarFilmes();
  }

  public abrir(id: number): void {
    this.router.navigateByUrl('/filmes/' + id);
  }

  public onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmeService.listar(this.config).subscribe(
      (filmes: Filme[]) => this.filmes.push(...filmes)
    );
  }

  private resetarConsulta() {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
