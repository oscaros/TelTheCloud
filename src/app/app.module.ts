import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { RegisterPage } from '../pages/register/register';
//import { DashboardPage } from '../pages/dashboard/dashboard';
import { HttpModule } from '@angular/http';
import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Contacts           
    //RegisterPage//,
    //DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule//,
    //Contacts
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage//,
    //RegisterPage//,
    //DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Contacts
  ]
})
export class AppModule {}
