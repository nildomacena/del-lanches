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
  rootPage:any = 'MenuPage';
  logado: boolean = false;
  pages: any[];
  user: any;
  constructor(
    platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    keyboard: Keyboard,
    public fire: FireService,
    public loadingCtrl: LoadingController
    ) {
    platform.ready().then(() => {
      
      this.fire.user.subscribe(dados => {
        console.log(dados);
        if(dados){
          this.nav.setRoot(HomePage);
          this.logado = true
        }
        else{
          this.logado = false;
          console.log('Não está logado');
        }
      })
      let loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      })
      /*
      this.fire.checarUsuario()
        .then(logado => {
          loading.dismiss();
          this.logado = logado;
          if(logado)
            this.nav.setRoot(HomePage);
        })*/
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
  acessarSistema(){
    this.nav.setRoot('LoginPage');
  }
  goToMenu(){
    this.nav.setRoot('MenuPage');
  }
  openPage(page){
    this.nav.push(page.component);
  }
}

