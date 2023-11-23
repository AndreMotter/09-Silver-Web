import { Component } from '@angular/core';

@Component({
  selector: 'app-fin-home-grafico-periodo',
  templateUrl: './fin-home-grafico-periodo.component.html',
  styleUrls: ['./fin-home-grafico-periodo.component.css']
})
export class FinHomeGraficoPeriodoComponent {
  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Despesas', 'Receitas'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

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

