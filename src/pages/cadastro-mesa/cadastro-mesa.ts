import { FireService } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cadastro-mesa',
  templateUrl: 'cadastro-mesa.html',
})
export class CadastroMesaPage {
  mesa: any;
  descricao: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public fire: FireService
    ) {
    this.mesa = this.navParams.get('mesa');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroMesaPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
  apagar(){
    let alert = this.alertCtrl.create({
      title: 'Excluir Item',
      subTitle: 'Deseja realmente excluir o item '+ this.mesa.descricao + '?',
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
            this.fire.deletarMesa(this.mesa.$key)
              .then(_ => {
                loading.dismiss();
                let toast = this.toastCtrl.create({
                  duration: 2500,
                  closeButtonText: 'X',
                  showCloseButton: true,
                  message: 'Item excluído'
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
    loading.present();
    this.fire.salvarMesa(this.descricao)
      .then(_ => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          duration: 2500,
          closeButtonText: 'X',
          showCloseButton: true,
          message: 'Mesa salva'
        });
        toast.present();
        this.dismiss();
      })
  }
  

}
