import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroMesaPage } from './cadastro-mesa';

@NgModule({
  declarations: [
    CadastroMesaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroMesaPage),
  ],
  exports: [
    CadastroMesaPage
  ]
})
export class CadastroMesaPageModule {}
