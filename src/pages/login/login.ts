import { Keyboard } from '@ionic-native/Keyboard';
import { FireService } from './../../providers/fire';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string = '';
  senha:string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
  }
  ionViewDidEnter(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      })
    this.fire.logar(this.email,this.senha)
      .then(_ => {
        this.navCtrl.setRoot(HomePage)
      })
      .catch(err => {
        let mensagem: string;
        if(err['code'] == 'auth/wrong-password'){
          mensagem = 'Usuário ou senha estão incorretos. Verifique as informações digitadas.'
        }
        else if(err['code'] == 'auth/invalid-email'){
          mensagem = 'Digite um email válido.';
        }
        else if(err['code'] == 'auth/user-not-found'){
          mensagem = 'Usuário não encontrado.';
        }
        else{
          mensagem = 'Ocorreu algum erro durante o login. Tente novamente mais tarde.'
        }
        let alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: mensagem,
          buttons: [{
            text: 'Ok',
            role: 'cancel'
          }]
        })
        alert.present();
        alert.onWillDismiss(() => {
          loading.dismiss()
        });
        console.error(err);
      })
  }

  criarUsuario(){
    this.fire.criarUsuario(this.email,this.senha)
      .then(_ => { 
          let alert = this.alertCtrl.create({
            title: 'Usuário criado',
            message: 'Pressione OK para navegar para o sistema',
            buttons: [
              {
              text: 'Cancel', role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
              }, {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.setRoot(HomePage);
                }
              }
            ]
          });
          alert.present();
      })
      .catch(err => {
        console.error(err);
        let alert = this.alertCtrl.create({
            title: 'Erro',
            message: 'Ocorreu um erro durante a criação do usuário. Se o erro persistir, entre em contato com o administrador do sistema.',
            buttons: [
              {
              text: 'Cancel', role: 'cancel',
              handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
      })
  }

}
