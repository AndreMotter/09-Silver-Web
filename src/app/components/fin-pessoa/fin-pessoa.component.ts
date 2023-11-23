import { Component } from '@angular/core';
import { FinPessoaService } from 'src/app/services/fin-pessoa.service';

@Component({
  selector: 'app-fin-pessoa',
  templateUrl: './fin-pessoa.component.html',
  styleUrls: ['./fin-pessoa.component.css']
})
export class FinPessoaComponent {

  pessoas!: any[]; 
  pessoa: any = {}; 
  displayModal: boolean = false;

  //filtros
  fil_nome!: string;

  constructor(
    private finPessoaService: FinPessoaService,
  ) { }

  ngOnInit(): void {
     this.listarPessoas();
  }

  listarPessoas(): void {
    debugger
    this.finPessoaService.listarFinPessoas(this.fil_nome).subscribe(
      {
        next: (response) => {
          this.pessoas = response.data;
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
  
  excluir(codigo: number) {
    this.finPessoaService.deletarFinPessoa(codigo).subscribe(
      {
        next: () => {
          this.listarPessoas();
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
