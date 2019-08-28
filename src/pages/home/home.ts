import { Component } from '@angular/core';
import { RegisterPage} from '../register/register';
import { DashboardPage} from '../dashboard/dashboard';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 constructor(public http:Http, public navCtrl: NavController) {

}

 validateLogin()
  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data=JSON.stringify({username: this.username, password:this.password});
    this.http.post('http://localhost:8180/codetest/index.php/restpostcontroller/login/',data,headers)
    .map(res => res.json())
    .subscribe(res => {
    alert("success: Userid "+res.userid+" Access Token "+res.token);
    this.navCtrl.push('DashboardPage');
    }, (err) => {
    alert("failed"+err);
    console.log(err);
    });

  }

 signUp(){
 this.navCtrl.push('RegisterPage');
 }

 

}
