import { Component } from '@angular/core';
import { FinPessoaService } from 'src/app/services/fin-pessoa.service';

@Component({
  selector: 'app-fin-pessoa-lista',
  templateUrl: './fin-pessoa-lista.component.html',
  styleUrls: ['./fin-pessoa-lista.component.css']
})
export class FinPessoaListaComponent {

  dataSource!: any[];
  displayedColumns: string[] = ['pes_codigo', 'pes_nome', 'pes_cpf', 'pes_email', 'pes_ativo', 'pes_data_nascimento'];

  constructor(
    private finPessoaService: FinPessoaService,
  ) { }

  ngOnInit(): void {
     this.listarPessoas();
  }

  listarPessoas(): void {
    this.finPessoaService.listarFinPessoas().subscribe(
      data => {
        this.dataSource = (<any>data).data;
      },
      error => {
        console.error(error)
      }
    );
  }
  
  adicionarPessoa(): void {
    // Aqui você pode navegar para a página de cadastro ou abrir um modal, por exemplo
  }

  editarPessoa(codigo: number) {
    console.log("Editar pessoa com código:", codigo);
    // Lógica para edição
  }
  
  excluirPessoa(codigo: number) {
    console.log("Excluir pessoa com código:", codigo);
    // Lógica para exclusão
  }
  
}
