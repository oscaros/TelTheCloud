import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {Http, Headers/*, RequestOptions*/}  from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { NavController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})


export class RegisterPage {

//@ViewChild("uniqueId") uniqueId;


constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,  public loading: LoadingController) { }

Register(){
//this.uniqueId = " ";
//check to confirm the uniqueId fields are filled
if(this.uniqueId.value==" "){
	let alert = this.alertCtrl.create({
	title:"ATTENTION",
	subTitle:"Unique ID field is empty",
	buttons: ['OK']
	});

    alert.present();

}else{


		let headers = new Headers();
		//headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );

		//let data = {userId: this.uniqueId};
		let data=JSON.stringify({uniqueId: this.uniqueId});

		console.log(data);

		let loader = this.loading.create({
		content: 'Processing please wait…',
		});

		loader.present().then(() => {		
           this.http.post('http://localhost:8180/codetest/index.php/restpostcontroller/registration/',data,headers)

			.map(res => res.json())
			.subscribe(res => {
			loader.dismiss()

			if(res=="Registration successfull"){
			let alert = this.alertCtrl.create({
			title:"CONGRATS",
			subTitle:(res),
			buttons: ['OK']
			});

			alert.present();
			this.navCtrl.push(HomePage);

			}else{

			let alert = this.alertCtrl.create({
			title:"ERROR",
			subTitle:(res),
			buttons: ['OK']
			});

			alert.present();

			}
			});

		});

}
}
}