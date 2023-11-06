import { Component } from '@angular/core';
import { FinPessoaService } from 'src/app/services/fin-pessoa.service';

@Component({
  selector: 'app-fin-pessoa-lista',
  templateUrl: './fin-pessoa-lista.component.html',
  styleUrls: ['./fin-pessoa-lista.component.css']
})
export class FinPessoaListaComponent {

  pessoas!: any[];

  constructor(
    private finPessoaService: FinPessoaService,
  ) { }

  ngOnInit(): void {
     this.listarPessoas();
  }

  listarPessoas(): void {
    this.finPessoaService.listarFinPessoas().subscribe(
      {
        next: (data) => {
          this.pessoas = data.data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  
  adicionarPessoa(): void {
    // Aqui você pode navegar para a página de cadastro ou abrir um modal, por exemplo
  }

  editarPessoa(codigo: number) {
    // this.finPessoaService.deletarFinPessoa(codigo).subscribe(
    //   {
    //     next: (data) => {
    //       console.log(data);
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     },
    //   });
  }
  
  excluirPessoa(codigo: number) {
    this.finPessoaService.deletarFinPessoa(codigo).subscribe(
      {
        next: (data) => {
          if(data.success == "true"){
            this.listarPessoas();
          }    
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  
}
