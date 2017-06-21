import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MesaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mesa',
  templateUrl: 'mesa.html',
})
export class MesaPage {
  mesa: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mesa = this.navParams.get('mesa');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesaPage');
  }

}
