import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';




@IonicPage()
@Component({
  selector: 'page-create-contact',
  templateUrl: 'create-contact.html',
})
export class CreateContactPage {
  model: Contact;
  constructor(public navCtrl: NavController, public navParams: NavParams, public contactsProvider: ContactsProvider,
              private toast: ToastController
  ) {
    this.model = new Contact();
    this.model.name = 'Novo contato';
    this.model.gender = 'male';

  }
  createContact() {
    var data = { 'name': this.model.name, 'gender': this.model.gender };
    this.contactsProvider.addContact(data)
      .then((result: any) => {
        this.toast.create({message: 'Contato criado' , duration: 1000}).present();
        console.log('Contato criado');
      })
      .catch((error: any) => {
        this.toast.create({message: 'Erro ao criar o contato. Pode ser que seu contato já exita',duration: 1500}).present();
        console.log(error);
      });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContactPage');
  }

}
export class Contact {
  name: string;
  gender: string;
}
