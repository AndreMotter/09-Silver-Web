//Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Prime ng
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';

//Componentes
import { FinPessoaComponent } from './components/fin-pessoa/fin-pessoa.component';
import { FinCategoriaComponent } from './components/fin-categoria/fin-categoria.component';
import { FinMovimentacaoComponent } from './components/fin-movimentacao/fin-movimentacao.component';
import { FinHomeGraficoPeriodoComponent } from './components/fin-home-grafico-periodo/fin-home-grafico-periodo.component';
import { FinHomeComponent } from './components/fin-home/fin-home.component';
import { FinToolbarComponent } from './components/fin-toolbar/fin-toolbar.component';
import { FinHomeGraficoAnualComponent } from './components/fin-home-grafico-anual/fin-home-grafico-anual.component';


@NgModule({
  declarations: [
    AppComponent,
    FinHomeComponent,
    FinPessoaComponent, 
    FinCategoriaComponent,
    FinMovimentacaoComponent,
    FinHomeGraficoPeriodoComponent,
    FinHomeComponent,
    FinToolbarComponent,
    FinHomeGraficoAnualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginatorModule,
    ChartModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    InputMaskModule,
    CheckboxModule,
    CalendarModule,
    DialogModule,
    TableModule,
    SidebarModule,
    ToolbarModule,
    MenuModule,
    RouterModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    ProgressSpinnerModule,
    DropdownModule,
    CardModule,
    RadioButtonModule,
    FieldsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
