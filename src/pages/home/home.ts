import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage} from '../register/register';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'; //added

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 //declare some vars
  loading: any;
  loginData = { username:'', password:'' };
  data: any;

  //added LoadingController, ToastController, AuthServiceProvider
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController) {
		
  }

  signUp(){

		  this.navCtrl.push(RegisterPage);

   }

  doLogin() {
    this.showLoader();
    this.authServiceProvider.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

 showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }




  

}
