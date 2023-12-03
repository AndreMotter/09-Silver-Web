import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinHomeComponent } from './components/fin-home/fin-home.component';
import { FinPessoaComponent } from './components/fin-pessoa/fin-pessoa.component';
import { FinCategoriaComponent } from './components/fin-categoria/fin-categoria.component';
import { FinMovimentacaoComponent } from './components/fin-movimentacao/fin-movimentacao.component';
import { FinLoginComponent } from './components/fin-login/fin-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: FinLoginComponent },
  { path: 'home', component: FinHomeComponent },
  { path: 'fin-pessoa', component: FinPessoaComponent },
  { path: 'fin-categoria', component: FinCategoriaComponent },
  { path: 'fin-movimentacao', component: FinMovimentacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
