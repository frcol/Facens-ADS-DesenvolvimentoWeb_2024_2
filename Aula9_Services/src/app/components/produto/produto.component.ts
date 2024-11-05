import { Component } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { Produto } from '../../models/produto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})

export class ProdutoComponent {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutosService) { }

  ngOnInit(): void {
      this.produtoService.obterProdutos().subscribe({
        next: produtos => {
          this.produtos = produtos;
          console.log(this.produtos);
         },
        error: error => {
          console.error("Erro ao carregar produtos:", error);
        }
      });
    }

    getProdutoById(form: NgForm) {
      console.log(form.value.id);

      this.produtoService.obterProdutoPorId(form.value.id).subscribe({
        next: produto => {
          console.log(produto);
        },
        error: error => {
          console.error("Erro ao carregar produto:", error);
        }
      });
    }

    cadastrarProduto(form: NgForm) {
      console.log(form.value);

      this.produtoService.salvarProduto(form.value).subscribe({
        next: produto => {
          console.log(produto);
        },
        error: error => {
          console.error("Erro ao salvar produto:", error);
        }
      });
    }

    apagarProduto(form: NgForm) {
      console.log(form.value.id);

      this.produtoService.excluirProduto(form.value).subscribe({
        next: produto => {
          console.log(produto);
        },
        error: error => {
          console.error("Erro ao excluir produto:", error);
        }
      });
    }

    editarProduto(form: NgForm) {
      console.log(form.value);

      this.produtoService.editarProduto(form.value).subscribe({
        next: produto => {
          console.log(produto);
        },
        error: error => {
          console.error("Erro ao editar produto:", error);
        }
      });
    }

}
