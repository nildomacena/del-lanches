import { FireService } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cadastro-categoria',
  templateUrl: 'cadastro-categoria.html',
})
export class CadastroCategoriaPage {
  descricao: string = '';
  categoria: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fire: FireService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
      this.categoria = this.navParams.get('categoria');
      if(this.categoria)
        this.descricao = this.categoria.descricao;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroCategoriaPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  } 
  apagar(){
    let alert = this.alertCtrl.create({
      title: 'Excluir categoria',
      subTitle: 'Deseja realmente excluir a categoria '+ this.categoria.descricao + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        { 
          text: 'Ok',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Salvando...'
            })
            this.fire.deletarCategoria(this.categoria.$key)
              .then(_ => {
                loading.dismiss();
                let toast = this.toastCtrl.create({
                  duration: 2500,
                  closeButtonText: 'X',
                  showCloseButton: true,
                  message: 'Categoria excluída'
                });
                toast.present();
                this.dismiss();
              })
          }
        }
      ]
    })
    alert.present();
  }

  salvar(){
    let loading = this.loadingCtrl.create({
      content: 'Salvando...'
    })
    if(this.categoria){
      this.fire.editarCategoria(this.categoria.$key, this.descricao)
        .then(_ => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            duration: 2500,
            closeButtonText: 'X',
            showCloseButton: true,
            message: 'Categoria salva'
          });
          toast.present();
          this.dismiss();
        })
    }
    else{
      this.fire.salvarCategoria(this.descricao)
        .then(_ => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            duration: 2500,
            closeButtonText: 'X',
            showCloseButton: true,
            message: 'Categoria salva'
          });
          toast.present();
          this.dismiss();
        })
    }
  }

  
}
