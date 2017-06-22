import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CallNumber } from '@ionic-native/call-number'
import { Keyboard } from '@ionic-native/keyboard';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FireService } from '../providers/fire';
import { Util } from '../providers/util';

const config = {
    apiKey: "AIzaSyA_LMfz2eUGwT7E4r6OedQOnrxnX4qj5iQ",
    authDomain: "del-lanches-1c7d3.firebaseapp.com",
    databaseURL: "https://del-lanches-1c7d3.firebaseio.com",
    projectId: "del-lanches-1c7d3",
    storageBucket: "del-lanches-1c7d3.appspot.com",
    messagingSenderId: "907589440220"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    PhotoViewer,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireService,
    Util
  ]
})
export class AppModule {}
