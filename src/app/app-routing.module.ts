import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FinPessoaComponent } from './components/fin-pessoa/fin-pessoa.component';
import { FinCategoriaComponent } from './components/fin-categoria/fin-categoria.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'fin-pessoa', component: FinPessoaComponent },
  { path: 'fin-categoria', component: FinCategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
