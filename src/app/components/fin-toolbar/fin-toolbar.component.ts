import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinLoginService } from 'src/app/services/fin-login.service';

@Component({
  selector: 'app-fin-toolbar',
  templateUrl: './fin-toolbar.component.html',
  styleUrls: ['./fin-toolbar.component.css']
})
export class FinToolbarComponent {

  constructor(
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  sair()
  {
    this.finLoginService.logout();
    this.router.navigate(['/login']);
  }

  usuario_logado: string = '';
  ngOnInit(): void {
    this.usuario_logado = this.finLoginService.getUserData().pes_login;
  }
}
