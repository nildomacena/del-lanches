import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FireService {

  constructor(
    public db: AngularFireDatabase
    ) {

  }

  salvarCategoria(categoria){
    return this.db.list('categorias').push({descricao: categoria})
  }

  salvarItem(descricao:string, preco:number, categoria:any){
    return this.db.list('itens').push({descricao: descricao, preco:preco, categoria_descricao: categoria.descricao, categoria_key: categoria.$key})
  }

  salvarMesa(descricao){
    return this.db.list('mesas').push({descricao: descricao})
  }
  editarCategoria(categoria_key:string, descricao:string){
    return this.db.list('categorias/').update(categoria_key, {descricao: descricao})
  }

  editarItem(item_key: string, descricao:string, preco:number, categoria:any){
    return this.db.list('itens/').update(item_key, {
      descricao: descricao,
      preco: preco,
      categoria_key: categoria.$key,
      categoria_descricao: categoria.descricao
    })      
  }

  deletarMesa(mesa_key){
    return this.db.list('mesas').remove(mesa_key);
  }
  deletarItem(item_key){
    return this.db.list('itens').remove(item_key);
  }

  deletarCategoria(categoria_key:string){
    return this.db.list('categorias').remove(categoria_key)
  }

  listarMesas(){
    return this.db.list('mesas').first().toPromise();
  }

  listarCategorias(){
    return this.db.list('categorias').first().toPromise();
  }
  
  listarItens(){
    return this.db.list('itens').first().toPromise();
  }
}
