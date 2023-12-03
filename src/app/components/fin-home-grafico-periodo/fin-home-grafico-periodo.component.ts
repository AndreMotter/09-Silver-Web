import { Component } from '@angular/core';
import { FinMovimentacaoService } from 'src/app/services/fin-movimentacao.service';

@Component({
  selector: 'app-fin-home-grafico-periodo',
  templateUrl: './fin-home-grafico-periodo.component.html',
  styleUrls: ['./fin-home-grafico-periodo.component.css']
})
export class FinHomeGraficoPeriodoComponent {
  
  constructor(
    private finMovimentacaoService: FinMovimentacaoService,
  ) { }

  data: any;
  options: any;
  loading: boolean = true;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.loading = true;
    this.finMovimentacaoService.resumoMensalFinMovimentacao().subscribe(
    {
      next: (response) => {
        debugger
        let dados_grafico = response.data;
        this.data = {
          labels: ['Despesas', 'Receitas'],
          datasets: [
            {
              data: [dados_grafico.despesas, dados_grafico.receitas],
              backgroundColor: [documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--green-400')]
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
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
}

