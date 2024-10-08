import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-validacao',
  templateUrl: './validacao.component.html',
  styleUrl: './validacao.component.css'
})

export class ValidacaoComponent {

  onSubmit(myForm: NgForm) {
    if (myForm.valid)
    alert('Formulário enviado');
  }
}
