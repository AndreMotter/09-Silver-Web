import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FinPessoaService } from 'src/app/services/fin-pessoa.service';

@Component({
  selector: 'app-fin-pessoa',
  templateUrl: './fin-pessoa.component.html',
  styleUrls: ['./fin-pessoa.component.css']
})
export class FinPessoaComponent {

  finPessoaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private finPessoaService: FinPessoaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.finPessoaForm = this.fb.group({
      pes_nome: ['', Validators.required],
      pes_login: ['', Validators.required],
      pes_senha: ['', Validators.required],
      pes_cpf: ['', Validators.required],
      pes_email: ['', [Validators.required, Validators.email]],
      pes_ativo: [true, Validators.required],
      pes_data_nascimento: ['', Validators.required]
    });
  }

  onSubmit() {
    debugger
    if (this.finPessoaForm.valid) {
      this.finPessoaService.createFinPessoa(this.finPessoaForm.value).subscribe(data => {
        this.router.navigate(['/fin-pessoa']);
      });
    }
  }
}
