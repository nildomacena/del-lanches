import { FireService } from './../../providers/fire';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mesas: any[];
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public fire: FireService
    ) {
      this.listarMesas()
  }

  listarMesas(){
    this.fire.listarMesas()
      .subscribe(mesas => {
        this.mesas = mesas;
      })
  }

  goToLogin(){
    this.navCtrl.setRoot('LoginPage');
  }
  
  goToMesa(mesa){
    this.navCtrl.push('MesaPage',{mesa:mesa});
  }
  
  cadastrar(){
    let modal = this.modalCtrl.create('CadastroMesaPage')
    modal.present();
    modal.onDidDismiss(() => {
      this.listarMesas();
    })
  }
}
