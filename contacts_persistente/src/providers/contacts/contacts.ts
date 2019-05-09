import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
const STORAGE_KEY = 'contacts';


@Injectable()
export class ContactsProvider {

  constructor(public storage: Storage) {
    console.log('Hello ContactsProvider Provider');

  }


  getContacts(){
    return this.storage.get(STORAGE_KEY);
  }


  addContact(data){
    return this.getContacts().then(result => {
      if (result) {
        data['id'] = result.length + 1;

        if(this.procuraContato(result,data)) {
          console.log('Deu certo o contato está sendo salvo');
          result.push(data);

          return this.storage.set(STORAGE_KEY, result);
        }else{
          console.log('Deu certo o contato NÂO está sendo salvo');

          return Promise.reject('Nome existente!');


        }

      } else {
        data['id'] = 1;
        return this.storage.set(STORAGE_KEY, [data]);
      }
    });
  }


  procuraContato(array , contato) {
    for (let i = 0; i < array.length ; i++) {
      if (contato['name'] == array[i]['name'])
        return false;

    }
    return true;

  }

}
