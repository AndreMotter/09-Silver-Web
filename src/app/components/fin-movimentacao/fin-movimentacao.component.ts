import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { FinCategoriaService } from 'src/app/services/fin-categoria.service';
import { FinContaBancariaService } from 'src/app/services/fin-conta-bancaria.service';
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
    private finCategoriaService: FinCategoriaService,
    private finContaBancariaService: FinContaBancariaService,
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  loading: boolean = true;
  movimentacoes!: any[]; 

  ngOnInit(): void {
    this.canActivate();
    this.listarMovimentacoes();
    this.listarCategoriasSelect();
    this.listarContasBancariaSelect();
  }

  filtro_mov_tipo: number = 9999;
  filtro_data_inicial!: any;
  filtro_data_final!: any;

  filtro_categoria_selecionada: any;
  listarMovimentacoes(): void {
    this.loading = true;
    let pes_codigo = Number(this.finLoginService.getUserId());
    let data_inicial = '';
    if(this.filtro_data_inicial){
      data_inicial = this.formataData1(this.filtro_data_inicial);
    }
    let data_final = '';
    if(this.filtro_data_final){
      data_final = this.formataData1(this.filtro_data_final);
    }
    this.finMovimentacaoService.listarFinMovimentacoes(this.filtro_mov_tipo, pes_codigo, this.filtro_categoria_selecionada, data_inicial, data_final).subscribe(
      {
        next: (response) => {
          this.movimentacoes = response.data;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  displayRelatorio: boolean = false;
  imprimirMovimentacoes(): void {
    this.displayRelatorio = true;
    let pes_codigo = Number(this.finLoginService.getUserId());
    let data_inicial = '';
    if(this.filtro_data_inicial){
      data_inicial = this.formataData1(this.filtro_data_inicial);
    }
    let data_final = '';
    if(this.filtro_data_final){
      data_final = this.formataData1(this.filtro_data_final);
    }
    this.finMovimentacaoService.imprimirFinMovimentacao(this.filtro_mov_tipo, pes_codigo, this.filtro_categoria_selecionada, data_inicial, data_final).subscribe({
      next: (response) => {
        let arrrayBuffer = this.base64ToArrayBuffer(response.data);
        let blob = new Blob([arrrayBuffer], { type: "application/pdf" });
        let link = window.URL.createObjectURL(blob);
        window.open(link, '_blank');
        this.displayRelatorio = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  lista_categorias!: any;
  listarCategoriasSelect(): void{
    let pes_codigo = Number(this.finLoginService.getUserId());
    this.finCategoriaService.listarSelectFinCategorias(pes_codigo).subscribe(
      {
        next: (response) => {
          this.lista_categorias = [{
            label: 'Nenhum...', 
            value: 0, 
          }];
          response.data.forEach((categoria: any)=> {
            this.lista_categorias.push({
              label: categoria.cat_sigla, 
              value: categoria.cat_codigo, 
            })
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  lista_contas_bancarias!: any;
  listarContasBancariaSelect(): void{
    let pes_codigo = Number(this.finLoginService.getUserId());
    this.finContaBancariaService.listarSelectFinContaBancariaService(pes_codigo).subscribe(
      {
        next: (response) => {
          debugger
          this.lista_contas_bancarias = [{
            label: 'Nenhum...', 
            value: 0, 
          }];
          response.data.forEach((categoria: any)=> {
            this.lista_contas_bancarias.push({
              label: categoria.cba_descricao, 
              value: categoria.cba_codigo, 
            })
          });
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
      this.finMovimentacaoService.deletarFinMovimentacao(this.codigoParaExcluir).subscribe(
        {
          next: () => {
            this.listarMovimentacoes();
          },
          error: (error) => {
            console.error(error);
          },
        });
        this.displayConfirmation = false;
    }
  }

  displayModal: boolean = false;
  movimentacao: any = {};
  outroscampos = [
    { label: 'Opção 1', value: 1 },
    { label: 'Opção 2', value: 2 },
  ];

  abrirModal() {
    this.movimentacao = {};
    this.displayModal = true;
  }

  fecharModal() {
    this.displayModal = false;
  }

  salvar() {
    this.movimentacao.cat_codigo = this.movimentacao.cat_codigo.value;
    this.movimentacao.cba_codigo = this.movimentacao.cba_codigo.value;
    this.movimentacao.pes_codigo = Number(this.finLoginService.getUserId());
    this.movimentacao.mov_data = this.formataData1(this.movimentacao.mov_data_sem_formatar);
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

  base64ToArrayBuffer(base64: any) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
 }

 dataMudaInicial(event: any) {
  let value = event.target.value;
  let formattedValue = value.replace(/[^0-9]/g, '').substring(0, 8); 
  if (formattedValue.length >= 2) {
      formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
  }
  if (formattedValue.length >= 5) {
      formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5);
  }

  this.filtro_data_inicial = formattedValue; 
}

dataMudaFinal(event: any) {
  let value = event.target.value;
  let formattedValue = value.replace(/[^0-9]/g, '').substring(0, 8); 
  if (formattedValue.length >= 2) {
      formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
  }
  if (formattedValue.length >= 5) {
      formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5);
  }

  this.filtro_data_final = formattedValue; 
}

dataMudaLanc(event: any) {
  let value = event.target.value;
  let formattedValue = value.replace(/[^0-9]/g, '').substring(0, 8); 
  if (formattedValue.length >= 2) {
      formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
  }
  if (formattedValue.length >= 5) {
      formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5);
  }
  this.movimentacao.mov_data_sem_formatar = formattedValue; 
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
