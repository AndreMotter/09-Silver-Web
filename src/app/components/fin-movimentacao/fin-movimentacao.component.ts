import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { FinCategoriaService } from 'src/app/services/fin-categoria.service';
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
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  loading: boolean = true;
  movimentacoes!: any[]; 

  ngOnInit(): void {
    this.canActivate();
    this.listarMovimentacoes();
    this.listarCategoriasSelect();
  }

  filtro_mov_tipo: number = 9999;
  filtro_data_inicial!: any;
  filtro_data_final!: any;
  filtro_categorias: SelectItem[] = [{
    label: 'Nenhum...', 
    value: 0, 
  }];
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

  listarCategoriasSelect(): void{
    let pes_codigo = Number(this.finLoginService.getUserId());
    this.finCategoriaService.listarSelectFinCategorias(pes_codigo).subscribe(
      {
        next: (response) => {
          this.filtro_categorias = [{
            label: 'Nenhum...', 
            value: 0, 
          }];
          response.data.forEach((categoria: any)=> {
            this.filtro_categorias.push({
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

  displayModal: boolean = false;
  movimentacao: any = {};
  mov_tipos = [
    { label: 'Receita', value: 1 },
    { label: 'Despesa', value: 2 }
  ];
  outroscampos = [
    { label: 'Opção 1', value: 1 },
    { label: 'Opção 2', value: 2 },
  ];

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
