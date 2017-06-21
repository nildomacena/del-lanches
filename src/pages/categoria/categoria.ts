import { FireService } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  categorias: any[];
  carregando: boolean = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {
      this.listarCategorias();
  } 

  listarCategorias(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    })
    loading.present();
    this.fire.listarCategorias()
      .then(categorias => {
        this.categorias = categorias
        console.log(categorias);
        this.carregando = false;
        loading.dismiss();
      })
  }
  ionViewDidLoad() {
    
  }

  cadastrar(){
    let modal = this.modalCtrl.create('CadastroCategoriaPage');
    modal.present();
    modal.onDidDismiss(() => {
      this.listarCategorias()
    });
  }

  editCategoria(categoria){
    let modal = this.modalCtrl.create('CadastroCategoriaPage', {categoria: categoria})
    modal.present();
    modal.onDidDismiss(() => {
      this.listarCategorias()
    });
  }
}
