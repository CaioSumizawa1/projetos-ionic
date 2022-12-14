import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage:Storage) {
    this.storage.create();
  }

  ngOnInit(){
    this.atualizaLista();
  }

  variavel_lista = [];
  texto: string = "";
  preco: number = 0;
  total: number = 0;
  aux = 0;

  async adiciona() {
    if (!(this.texto == "" || this.preco == 0)) {

      this.variavel_lista.forEach(item => {
        if(parseInt(item[0]) > this.aux) {
          this.aux = parseInt(item[0]);
        }
      })
      this.aux = this.aux + 1;
      await this.storage.set(this.aux.toString(), [this.texto, this.preco]);
      this.atualizaLista();
      this.texto = "";
      this.preco = 0;
    
      
    }
    
     

  }

  atualizaLista() {
    this.variavel_lista = [];
    this.total = 0;
    this.storage.forEach((value, key, index) => {
      this.variavel_lista.push([key, value]);
      this.soma(value[1]);
    })
  }

  async remove(indice) {
    
    await this.storage.remove(indice);
    this.atualizaLista();

  
 
}
soma(preco){
  this.total = (+this.total) + (+preco)
}
}
