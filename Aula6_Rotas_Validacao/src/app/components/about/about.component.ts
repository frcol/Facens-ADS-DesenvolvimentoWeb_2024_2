import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})


export class AboutComponent {
  id:number;
  nome:string;

  constructor(private router: ActivatedRoute) {
    this.id = this.router.snapshot.params['id'];
    this.nome = this.router.snapshot.params['nome'];
  }

  ngOninit() {

  }
}
