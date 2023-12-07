import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinCategoriaService } from 'src/app/services/fin-categoria.service';
import { FinLoginService } from 'src/app/services/fin-login.service';

@Component({
  selector: 'app-fin-categoria',
  templateUrl: './fin-categoria.component.html',
  styleUrls: ['./fin-categoria.component.css']
})
export class FinCategoriaComponent {

  canActivate(): boolean {
    if (this.finLoginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  categorias!: any[]; 
  categoria: any = {}; 
  selecionado_cat_tipo: any;
  cat_tipos: any = [
    { label: 'Despesas', value: 0 },
    { label: 'Receitas', value: 1 }
  ];

  constructor(
    private finCategoriaService: FinCategoriaService,
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.canActivate();
    this.listarCategorias();
  }

  cat_sigla!: string;
  listarCategorias(): void {
    let pes_codigo = Number(this.finLoginService.getUserId());
    this.finCategoriaService.listarFinCategorias(pes_codigo, this.cat_sigla).subscribe(
      {
        next: (response) => {
          this.categorias = response.data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editar(codigo: number) {
    debugger
    this.finCategoriaService.buscarPorIdFinCategoria(codigo).subscribe(
      {
        next: (response) => {
          this.categoria = response.data;
          this.selecionado_cat_tipo.value = response.data.cat_tipo;
          this.displayModal = true;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  displayConfirmation: boolean = false;
  codigoParaExcluir: number | null = null;
  confirmarExclusao(codigo: number) {
    this.codigoParaExcluir = codigo;
    this.displayConfirmation = true;
  }

  excluir() {
    if (this.codigoParaExcluir) {
      this.finCategoriaService.deletarFinCategoria(this.codigoParaExcluir).subscribe(
        {
          next: () => {
            this.listarCategorias();
          },
          error: (error) => {
            console.error(error);
          },
        });
        this.displayConfirmation = false;
    }
  }

  displayModal: boolean = false;
  abrirModal() {
    this.categoria = {};
    this.displayModal = true;
  }

  fecharModal() {
    this.displayModal = false;
  }
  
  salvar() {
    debugger
    this.categoria.cat_tipo = this.selecionado_cat_tipo.value;
    this.categoria.pes_codigo = Number(this.finLoginService.getUserId());
    this.finCategoriaService.salvarFinCategoria(this.categoria).subscribe({
      next: () => {
        this.fecharModal();
        this.listarCategorias();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
