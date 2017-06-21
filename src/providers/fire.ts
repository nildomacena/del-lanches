import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/first';

@Injectable()
export class FireService {
  user: Observable<firebase.User>;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
    ) {

  }

  criarUsuario(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  checarUsuario(){
    console.log(this.afAuth.auth.currentUser)
    let promise: Promise<boolean>
    promise = new Promise((resolve,reject) => {
      setTimeout(() => {
        if(this.afAuth.auth.currentUser)
          resolve(true);
        else 
          resolve(false)
      }, 500);
    })
    return promise;
  }
  logar(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.afAuth.auth.signOut();
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
    return this.db.list('mesas');
  }

  listarCategorias(){
    return this.db.list('categorias').first().toPromise();
  }
  
  listarItens(){
    return this.db.list('itens').first().toPromise();
  }

  getMesa(mesa_key:string){
    return this.db.object(`mesas/${mesa_key}`);
  }

  limparComanda(mesa_key){
    return this.db.object(`mesas/${mesa_key}/comanda_aberta`).remove();
  }
  verificarComandaAberta(){

  }

  fecharComanda(mesa:any, valor_total:number){
    let timestamp = new Date().getTime();
    Object.keys(mesa.comanda_aberta.itens).map(key => {
      delete mesa.comanda_aberta.itens[key].key
    })
    console.log(mesa);
    let obj = {
      mesa_descricao: mesa.descricao,
      mesa_key: mesa.$key,
      itens: mesa.comanda_aberta.itens,
      timestamp: timestamp,
      valor_total: valor_total
    }
    return this.db.list('pedidos/').push(obj)
              .then(_ => {
                return this.db.object(`mesas/${mesa.$key}/comanda_aberta`).remove()
              })
  }

  adicionarItemComanda(mesa_key:string, item: any){
    return this.db.list(`mesas/${mesa_key}/comanda_aberta/itens`).push(item);
  }

  deletarItemComanda(mesa_key, item_key){
    return this.db.object(`mesas/${mesa_key}/comanda_aberta/itens/${item_key}`).remove();
  }
}
