import { Component } from '@angular/core';

@Component({
  selector: 'app-fin-home-grafico-anual',
  templateUrl: './fin-home-grafico-anual.component.html',
  styleUrls: ['./fin-home-grafico-anual.component.css']
})
export class FinHomeGraficoAnualComponent {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          labels: ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [
              {
                  label: 'Receitas',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  borderColor: documentStyle.getPropertyValue('--green-400'),
                  data: [65, 59, 80, 81, 56, 55, 40, 30, 21, 26, 80, 43]
              },
              {
                  label: 'Despesas',
                  backgroundColor: documentStyle.getPropertyValue('--red-500'),
                  borderColor: documentStyle.getPropertyValue('--red-400'),
                  data: [28, 48, 40, 19, 86, 27, 90, 30, 21, 26, 80, 43]
              }
          ]
      };

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
}
