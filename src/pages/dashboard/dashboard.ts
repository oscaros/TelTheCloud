import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts/ngx';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})       
export class DashboardPage {

  myContacts: Contact[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  loadContacts() {
    var options = {
      filter: '',
      multiple: true,
      hasPhoneNumber: true
    };
 
    this.contacts.find(['*'], options).then((contacts: Contact[]) => {
      this.myContacts = contacts;
    });
  }
 
  createContact() {
    let contact: Contact = this.contacts.create();
 
    contact.name = new ContactName(null, 'Albus', 'Ape');
    contact.phoneNumbers = [ new ContactField('mobile', '12345678') ];
    contact.save().then(
      async () => {
        let toast = await this.toastCtrl.create({
          message: 'Contact added!'
        });
        toast.present();
      },
      (error: any) => console.error('Error saving contact.', error)
    );
  }

}
