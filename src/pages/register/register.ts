import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component} from '@angular/core';
import {Http, Headers, RequestOptions}  from "@angular/http";
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

//uniqueId : uniqueId = {}

export class RegisterPage {

constructor(public navCtrl: NavController, public alertCtrl: AlertController,  private http: Http,  public loading: LoadingController) { }

Register(){
this.uniqueId.value=0;

//check to confirm the username, email, telephone and password fields are filled
if(this.uniqueId.value=="" || this.uniqueId.value==null){
	let alert = this.alertCtrl.create({
	title:"ATTENTION",
	subTitle:"Unique ID field is empty",
	buttons: ['OK']
	});

    alert.present();

}else{

		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		let options = new RequestOptions({ headers: headers });

		//let data = {userId: this.uniqueId.value};
		let data=JSON.stringify({userId: this.uniqueId.value});

		let loader = this.loading.create({
		content: 'Processing please wait…',
		});

		loader.present().then(() => {		
           this.http.post('http://localhost:8180/codetest/index.php/restpostcontroller/registration/',data,headers)

			//this.http.post('http://localhost:8180/codetest/index.php/restpostcontroller/registration/',data, options)
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