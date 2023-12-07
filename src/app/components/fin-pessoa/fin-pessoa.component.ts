import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinLoginService } from 'src/app/services/fin-login.service';
import { FinPessoaService } from 'src/app/services/fin-pessoa.service';

@Component({
  selector: 'app-fin-pessoa',
  templateUrl: './fin-pessoa.component.html',
  styleUrls: ['./fin-pessoa.component.css']
})
export class FinPessoaComponent {

  canActivate(): boolean {
    if (this.finLoginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  loading: boolean = true;
  pessoas!: any[]; 
  pessoa: any = {}; 

  constructor(
    private finPessoaService: FinPessoaService,
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
     this.listarPessoas();
     this.canActivate();
  }

  fil_ativo: number = 0;
  fil_nome!: string;
  fil_cpf!: string;

  listarPessoas(): void {
    this.loading = true;
    this.finPessoaService.listarFinPessoas(this.fil_nome, this.fil_cpf, this.fil_ativo).subscribe(
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
    debugger
    this.finPessoaService.buscarPorIdFinPessoa(codigo).subscribe(
      {
        next: (response) => {
          this.pessoa = response.data;
          this.pessoa.pes_data_nascimento = this.formataData2(this.pessoa.pes_data_nascimento);
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
    this.pessoa = {};
    this.displayModal = true;
  }

  fecharModal() {
    this.displayModal = false;
  }
  
  salvar() {
    debugger
    this.pessoa.pes_data_nascimento = this.formataData1(this.pessoa.pes_data_nascimento);
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

  dataMuda(event: any) {
    let value = event.target.value;
    let formattedValue = value.replace(/[^0-9]/g, '').substring(0, 8); 
    if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
    }
    if (formattedValue.length >= 5) {
        formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5);
    }

    this.pessoa.pes_data_nascimento = formattedValue; 
  }

  formataData1(dateString: string): string {
    let parts = dateString.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString; 
  }

  formataData2(isoString: string): string {
    let date = new Date(isoString);
    let day = ('0' + date.getDate()).slice(-2); 
    let month = ('0' + (date.getMonth() + 1)).slice(-2); 
    let year = date.getFullYear(); 
    return `${day}/${month}/${year}`;
  }
}
