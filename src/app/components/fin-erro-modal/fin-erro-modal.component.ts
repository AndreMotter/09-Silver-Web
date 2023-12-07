import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-fin-erro-modal',
  templateUrl: './fin-erro-modal.component.html',
  styleUrls: ['./fin-erro-modal.component.css']
})
export class FinErroModalComponent {
  @Input() message: string = '';
  isVisible: boolean = false; 

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
