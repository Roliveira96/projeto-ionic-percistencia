import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-create-contact',
  templateUrl: 'create-contact.html',
})
export class CreateContactPage {
  model: Contact;
  photo: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public contactsProvider: ContactsProvider,
              private toast: ToastController, private camera: Camera
  ) {
    this.model = new Contact();
    this.model.name = 'Novo contato';
    this.model.gender = 'male';

  }
  createContact() {
    let data = { 'name': this.model.name, 'gender': this.model.gender };
    this.contactsProvider.addContact(data)
      .then((result: any) => {
        this.toast.create({message: 'Contato criado '+result , duration: 1000}).present();
        console.log('Contato criado');
      })
      .catch((error: any) => {
        this.toast.create({message: 'Erro ao criar o contato. Pode ser que seu contato já exita',duration: 1500}).present();
        console.log(error);
      });
  }


  takePicture() {
    this.photo = '';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateContactPage');
  }

}
export class Contact {
  name: string;
  gender: string;
}
