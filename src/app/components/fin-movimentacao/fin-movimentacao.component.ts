import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinLoginService } from 'src/app/services/fin-login.service';
import { FinMovimentacaoService } from 'src/app/services/fin-movimentacao.service';

@Component({
  selector: 'app-fin-movimentacao',
  templateUrl: './fin-movimentacao.component.html',
  styleUrls: ['./fin-movimentacao.component.css']
})
export class FinMovimentacaoComponent {

  canActivate(): boolean {
    if (this.finLoginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  constructor(
    private finMovimentacaoService: FinMovimentacaoService,
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  movimentacoes!: any[]; 
  movimentacao: any = {}; 
  displayModal: boolean = false;

  //filtros consulta
  filtro_mov_tipo!: number;

  ngOnInit(): void {
    this.listarMovimentacoes();
    this.canActivate();
  }

  listarMovimentacoes(): void {
    this.finMovimentacaoService.listarFinMovimentacoes(this.filtro_mov_tipo).subscribe(
      {
        next: (response) => {
          this.movimentacoes = response.data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  excluir(codigo: number) {
    this.finMovimentacaoService.deletarFinMovimentacao(codigo).subscribe(
      {
        next: () => {
          this.listarMovimentacoes();
        },
        error: (error) => { 
          console.error(error);
        },
      });
  }

  editar(codigo: number) {
    this.finMovimentacaoService.buscarPorIdFinMovimentacao(codigo).subscribe(
      {
        next: (response) => {
          this.movimentacao = response.data;
          this.abrirModal()
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  abrirModal() {
    this.displayModal = true;
  }

  fecharModal() {
    this.displayModal = false;
  }

  salvar() {
    this.finMovimentacaoService.salvarFinMovimentacao(this.movimentacao).subscribe({
      next: () => {
        this.fecharModal();
        this.listarMovimentacoes();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
