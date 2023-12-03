import { Component } from '@angular/core';
import { FinPessoaService } from 'src/app/services/fin-pessoa.service';

@Component({
  selector: 'app-fin-pessoa',
  templateUrl: './fin-pessoa.component.html',
  styleUrls: ['./fin-pessoa.component.css']
})
export class FinPessoaComponent {

  loading: boolean = true;
  pessoas!: any[]; 
  pessoa: any = {}; 

  constructor(
    private finPessoaService: FinPessoaService,
  ) { }

  first: number = 0;
  rows: number = 10;
  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
      this.listarPessoas();
  }

  ngOnInit(): void {
     this.listarPessoas();
  }

  fil_ativo: number = 0;
  fil_nome!: string;
  fil_cpf!: string;

  listarPessoas(): void {
    this.loading = true;
    this.finPessoaService.listarFinPessoas(this.fil_nome, this.fil_cpf, this.fil_ativo, this.first, this.rows).subscribe(
      {
        next: (response) => {
          this.pessoas = response.data;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editar(codigo: number) {
    this.finPessoaService.buscarPorIdFinPessoa(codigo).subscribe(
      {
        next: (response) => {
          this.pessoa = response.data;
          this.abrirModal()
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
      this.finPessoaService.deletarFinPessoa(this.codigoParaExcluir).subscribe(
        {
          next: () => {
            this.listarPessoas();
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
    this.displayModal = true;
  }

  fecharModal() {
    this.displayModal = false;
  }
  
  salvar() {
    this.finPessoaService.salvarFinPessoa(this.pessoa).subscribe({
      next: () => {
        this.fecharModal();
        this.listarPessoas();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
