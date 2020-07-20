import { Alerta } from './../../shared/models/alerta';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public dialog: MatDialog,
              public validacao: ValidarCamposService,
              private fb: FormBuilder,
              private filmesService: FilmesService,
              private router: Router) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.validation();
    this.generos = ['Ação', 'Aventura', 'Romance', 'Terror', 'Ficção científica', 'Comédia', 'Drama', 'Mistério'];
  }

  private validation() {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
  }

  public submit() {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
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

}
