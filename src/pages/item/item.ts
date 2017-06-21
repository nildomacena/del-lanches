import { FireService } from './../../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, Loading, Select, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {
  @ViewChild(Select) select: Select;
  itens: any[];
  itemSelecionado: any;
  categorias: any[];
  carregando: boolean = true;
  loading: Loading;
  categoriaSelecionada: any;
  itensFiltrados: any[];
  adicionandoItem: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController
    ) {
      this.adicionandoItem = this.navParams.get('adicionar');
      console.log(this.adicionandoItem);
  }

  ionViewDidLoad() {
    this.listarItens();
    this.loading = this.loadingCtrl.create({
      content: 'Carregando informações'
    })
    this.loading.present()
    console.log('ionViewDidLoad ItemPage');

  }

  listarItens(){
    this.fire.listarCategorias()
      .then(categorias => {
        this.categorias = categorias
        console.log(categorias);
        this.fire.listarItens()
          .then(itens => {
            this.itens = this.itensFiltrados = itens;
            this.carregando = false;
            this.loading.dismiss(); 
          })
      })
  }

  addItem(item:any){
    this.viewCtrl.dismiss({item:this.itemSelecionado});
  }

  filtrar(){

  }
  onSelectItem(item){
    this.itemSelecionado = item;
    console.log(this.itemSelecionado);
  }

  editItem(item){
    let modal = this.modalCtrl.create('CadastroItensPage',{categorias: this.categorias, item: item});
    modal.present();
    modal.onDidDismiss(() => {
      this.listarItens()
    });
  } 

  onSelectCategoria(){
    console.log(this.categoriaSelecionada);
    this.itensFiltrados = [];
    if(this.categoriaSelecionada){
      this.itens.map(item => {
        if(item.categoria_key == this.categoriaSelecionada){
          this.itensFiltrados.push(item);
        }
      })
    }
    else{
      this.itensFiltrados = this.itens;
    }
  }
  cadastrar(){
    let modal = this.modalCtrl.create('CadastroItensPage',{categorias: this.categorias});
    modal.present();
    modal.onDidDismiss(() => {
      this.listarItens()
    });
  }

  onChange(event){
    console.log(event);
  }
}
