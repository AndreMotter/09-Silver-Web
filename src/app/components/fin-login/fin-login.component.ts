import { Component } from '@angular/core';
import { FinLoginService } from 'src/app/services/fin-login.service';

@Component({
  selector: 'app-fin-login',
  templateUrl: './fin-login.component.html',
  styleUrls: ['./fin-login.component.css']
})
export class FinLoginComponent {

  constructor(
    private finLoginService: FinLoginService,
  ) { }

  usuario!: string;
  senha!: string;
  private isAuthenticated = false;
  
  login(): void {
  
    let login = {
      usuario: this.usuario,
      senha: this.senha
    }

    this.finLoginService.login(login).subscribe({
      next: (response) => {
         let retorno = response.data;
         if(retorno.autenticado){
            this.isAuthenticated = true;
         } else {
             this.isAuthenticated = false;
         }
      },
      error: (error) => {
        console.error(error);
        this.isAuthenticated = false;
      },
    });
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
