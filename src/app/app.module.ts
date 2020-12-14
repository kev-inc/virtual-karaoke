import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { MenuPage } from '../pages/menu/menu';
import { ControlPageModule } from '../pages/control/control.module';
import { ScreenPageModule } from '../pages/screen/screen.module';
import { SearchPageModule } from '../pages/search/search.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { firebaseConfig } from './app.firebase.config';
import { ControlPage } from '../pages/control/control';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    MenuPageModule,
    ControlPageModule,
    ScreenPageModule,
    SearchPageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
  ]
})
export class AppModule {}
