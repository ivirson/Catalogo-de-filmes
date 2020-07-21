import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { Alerta } from './../../shared/models/alerta';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {

  semFoto = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7GpbN3UDBr906iiXrTpK2veDQKZcDSbyvXQ&usqp=CAU';
  filme: Filme;
  id: number;

  constructor(public dialog: MatDialog,
              private activedRoute: ActivatedRoute,
              private filmesService: FilmesService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.visualizarFilme();
  }

  public editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }

  public excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza de que deseja excluir, clique em Ok.',
        btnSucesso: 'Ok',
        corBtnSucesso: 'primary',
        corBtnCancelar: 'warn',
        possuiBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe(
      (opcao: boolean) => {
        if (opcao) {
          this.filmesService.excluir(this.id)
            .subscribe(() => this.router.navigateByUrl('/filmes'));
        }
      }
    );
  }

  private visualizarFilme(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
      console.log(filme);
    });
  }

}
