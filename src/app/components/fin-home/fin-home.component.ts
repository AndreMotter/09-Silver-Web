import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FinLoginService } from 'src/app/services/fin-login.service';

@Component({
  selector: 'app-fin-home',
  templateUrl: './fin-home.component.html',
  styleUrls: ['./fin-home.component.css']
})
export class FinHomeComponent {

  constructor(
    private finLoginService: FinLoginService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.finLoginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  ngOnInit(): void {
    //this.canActivate();
  }
}
