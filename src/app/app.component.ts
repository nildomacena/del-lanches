import { Keyboard } from '@ionic-native/keyboard';
import { FireService } from './../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginPage';
  pages: any[];

  constructor(
    platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    keyboard: Keyboard,
    public fire: FireService,
    public loadingCtrl: LoadingController
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      })
      this.fire.checarUsuario()
        .then(logado => {
          loading.dismiss();
          if(logado)
            this.nav.setRoot(HomePage);
        })
      this.pages = [
        {titulo: 'Categorias', component: 'CategoriaPage'},
        {titulo: 'Itens', component: 'ItemPage'},
        {titulo: 'Menu (teste)', component: 'MenuPage'}
      ]
      keyboard.disableScroll(true);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  sair(){
    this.fire.logout()
      .then(_ => {
        this.nav.setRoot('LoginPage')
      })
  }
  openPage(page){
    this.nav.push(page.component);
  }
}

