import { Alerta } from './../../shared/models/alerta';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public dialog: MatDialog,
              public validacao: ValidarCamposService,
              private fb: FormBuilder,
              private filmesService: FilmesService,
              private router: Router,
              private activedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.criarformulario(filme));
    } else {
      this.criarformulario(this.criarFilmeEmBranco());
    }
    this.generos = ['Ação', 'Aventura', 'Romance', 'Terror', 'Ficção científica', 'Comédia', 'Drama', 'Mistério'];
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      dtLancamento: null,
      genero: null,
      nota: null,
      titulo: null,
      descricao: null,
      urlFoto: null,
      urlIMDb: null
    };
  }

  private criarformulario(filme: Filme) {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  public submit() {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  public reiniciarForm() {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar um novo filme',
            corBtnCancelar: 'primary',
            possuiBtnFechar: true
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(
          (opcao: boolean) => {
            if (opcao) {
              this.router.navigateByUrl('filmes');
            } else {
              this.reiniciarForm();
            }
          }
        );
      },
      () => {
        const config = {
          data: {
            titulo: 'Ocorreu um erro!',
            descricao: 'Não conseguimos salvar o seu registro, tente novamente mais tarde.',
            btnSucesso: 'Fechar',
            corBtnSucesso: 'warn'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

  private editar(filme: Filme): void {
    this.filmesService.editar(filme).subscribe(
      () => {
        const config = {
          data: {
            descricao: 'Seu registro foi atualizado com sucesso.',
            btnSucesso: 'Ir para a listagem'
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
      },
      () => {
        const config = {
          data: {
            titulo: 'Ocorreu um erro!',
            descricao: 'Não conseguimos editar o seu registro, tente novamente mais tarde.',
            btnSucesso: 'Fechar',
            corBtnSucesso: 'warn'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }

}
