import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//let apiUrl = 'http://localhost:8080/api/';
let apiUrl = 'http://localhost:8180/codetest/index.php/restpostcontroller/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

   login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();

 headers.append('Access-Control-Allow-Origin', '*');
 //headers.append('Access-Control-Allow-Credentials', 'TRUE');
  headers.append('Access-Control-Allow-Methods', 'GET, PUT, POST');
  headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        headers.append('Content-Type', 'application/json');

        //this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(response => {
            resolve(response.json());
          }, (error) => {
            reject(error);
          });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'guest/signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (error) => {
            reject(error);
          });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));

        this.http.post(apiUrl+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (error) => {
            reject(error);
          });
    });
  }

}
