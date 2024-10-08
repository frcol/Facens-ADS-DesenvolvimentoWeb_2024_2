import { Component } from '@angular/core';

interface Pessoa {
  nome: string;
  idade: number;
  ativo: boolean;
}

@Component({
  selector: 'app-diretivas',
  templateUrl: './diretivas.component.html',
  styleUrl: './diretivas.component.css'
})

export class DiretivasComponent {
  pessoas: Pessoa[] = [
    { nome: 'João',
      idade: 20,
      ativo: true },
    { nome: 'Maria', idade: 25, ativo: true  },
    { nome: 'José', idade: 30, ativo: false  },
    { nome: 'Pedro', idade: 35, ativo: true  },
    { nome: 'Paula', idade: 40, ativo: true  }
  ]

  ativar(pessoa:Pessoa) {
    pessoa.ativo = !pessoa.ativo;
  }
}
