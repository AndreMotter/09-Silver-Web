import { Component } from '@angular/core';
import { FinCategoriaService } from 'src/app/services/fin-categoria.service';

@Component({
  selector: 'app-fin-categoria',
  templateUrl: './fin-categoria.component.html',
  styleUrls: ['./fin-categoria.component.css']
})
export class FinCategoriaComponent {

  categorias!: any[]; 
  categoria: any = {}; 
  tiposCategorias: any = [
    { name: 'Despesas', code: 0 },
    { name: 'Receitas', code: 1 }
  ];
  displayModal: boolean = false;

  constructor(
    private finCategoriaService: FinCategoriaService,
  ) { }

  ngOnInit(): void {
    this.listarCategorias();
 }

  listarCategorias(): void {
    this.finCategoriaService.listarFinCategorias().subscribe(
      {
        next: (response) => {
          this.categorias = response.data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editar(codigo: number) {
    this.finCategoriaService.buscarPorIdFinCategoria(codigo).subscribe(
      {
        next: (response) => {
          this.categoria = response.data;
          this.abrirModal()
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  excluir(codigo: number) {
    this.finCategoriaService.deletarFinCategoria(codigo).subscribe(
      {
        next: () => {
          this.listarCategorias();
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
    this.finCategoriaService.salvarFinCategoria(this.categoria).subscribe({
      next: () => {
        this.fecharModal();
        this.listarCategorias();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
