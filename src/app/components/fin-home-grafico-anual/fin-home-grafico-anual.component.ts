import { Component } from '@angular/core';
import { FinLoginService } from 'src/app/services/fin-login.service';
import { FinMovimentacaoService } from 'src/app/services/fin-movimentacao.service';

@Component({
  selector: 'app-fin-home-grafico-anual',
  templateUrl: './fin-home-grafico-anual.component.html',
  styleUrls: ['./fin-home-grafico-anual.component.css']
})
export class FinHomeGraficoAnualComponent {

 constructor(
        private finMovimentacaoService: FinMovimentacaoService,
        private finLoginService: FinLoginService,
 ) { }
 
  data: any;
  options: any;
  loading: boolean = true;
  ano!: number;

  ngOnInit() {
    this.ano = new Date().getFullYear();
    this.carregaGrafico();
  }

  carregaGrafico(){
    this.loading = true;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    let pes_codigo = Number(this.finLoginService.getUserId());
    this.finMovimentacaoService.resumoAnualFinMovimentacao(pes_codigo, this.ano).subscribe(
        {
          next: (response) => {
            let dados_grafico = response.data;
            this.data = {
                labels: ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Receitas',
                        backgroundColor: documentStyle.getPropertyValue('--green-500'),
                        borderColor: documentStyle.getPropertyValue('--green-400'),
                        data: [dados_grafico.janeiro_receita, dados_grafico.fevereiro_receita, dados_grafico.marco_receita, dados_grafico.abril_receita, dados_grafico.maio_receita, dados_grafico.junho_receita, dados_grafico.julho_receita, dados_grafico.agosto_receita, dados_grafico.setembro_receita, dados_grafico.outubro_receita, dados_grafico.novembro_receita, dados_grafico.dezembro_receita]
                    },
                    {
                        label: 'Despesas',
                        backgroundColor: documentStyle.getPropertyValue('--red-500'),
                        borderColor: documentStyle.getPropertyValue('--red-400'),
                        data: [dados_grafico.janeiro_despesa, dados_grafico.fevereiro_despesa, dados_grafico.marco_despesa, dados_grafico.abril_despesa, dados_grafico.maio_despesa, dados_grafico.junho_despesa, dados_grafico.julho_despesa, dados_grafico.agosto_despesa, dados_grafico.setembro_despesa, dados_grafico.outubro_despesa, dados_grafico.novembro_despesa, dados_grafico.dezembro_despesa]
                    }
                ]
            };
        
            this.loading = false;
          },
          error: (error) => {
            console.error(error);
          },
    });

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };

  }

  displayRelatorio: boolean = false;
  imprimirResumoExercicio(): void {
    this.displayRelatorio = true;
    let pes_codigo = Number(this.finLoginService.getUserId());
    this.finMovimentacaoService.imprimirResumoExercicioFinMovimentacao(pes_codigo, this.ano).subscribe({
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


}
