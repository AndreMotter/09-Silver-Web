import { Component } from '@angular/core';
import { FinLoginService } from 'src/app/services/fin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fin-login',
  templateUrl: './fin-login.component.html',
  styleUrls: ['./fin-login.component.css']
})
export class FinLoginComponent {

  constructor(private router: Router, private finLoginService: FinLoginService) { }

  login: string = '';
  senha: string = '';
  
  logar(): void {

    let dadosLogin = {
      usuario: this.login,
      senha: this.senha
    };

    this.finLoginService.login(dadosLogin).subscribe({
      next: (response) => {
        let retorno = response.data;
        if(retorno.autenticado){
          this.finLoginService.setLoggedIn();
          this.finLoginService.setUserData(retorno.dadosUsuario);
          this.router.navigate(['/home']);
        }
        else
        {

        }       
      },
      error: (error) => {
        console.error(error);
        this.finLoginService.logout();
      }
    });
  }


}
