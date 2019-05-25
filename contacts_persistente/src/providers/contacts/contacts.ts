import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {renderComponent} from "@angular/core/src/render3";

const STORAGE_KEY = 'contacts';


@Injectable()
export class ContactsProvider {

  constructor(public storage: Storage) {
    console.log('Hello ContactsProvider Provider');

  }


  getContacts() {
    return this.storage.get(STORAGE_KEY);
  }

  getContact(id) {
    console.log('Dentro do getContact id:' + id);


    return this.getContacts().then(result => {
      id = this.procuraContatoRtIndex(result, id)
      console.log('Teste do getContacts --> ' + result[id]['name']);
      console.log('Teste do getContacts --> ' + result[id]['id']);
      console.log('Teste do getContacts --> ' + id);
      return result[id];
    }).catch(erro => {
      console.log("error o contato não foi localizado! Ou ocorreu um erro interno")
    });
  }


  addContact(data) {
   return  this.getContacts().then(result => {
      if (result) {
        data['id'] = result.length + 1;

        if (!this.procuraContato(result, data)) {
          console.log('Deu certo o contato está sendo salvo');
          result.push(data);

          return this.storage.set(STORAGE_KEY, result);
        } else {
          console.log('Não deu certo o contato NÂO está sendo salvo');

        }

      } else {
        data['id'] = 1;
        return this.storage.set(STORAGE_KEY, [data]);
      }
    });
  }

  destroyContact(id: number) {

    console.log("Dentro do destroycontact  --> id: " + id);


    return this.getContacts().then(result => {
      id = this.procuraContatoRtIndex(result, id)
      if (result) {

        console.log('<------------ Teste implementação --------------->');

        console.log('O contato a ser deletado é : ' + result[id]['name']);
        let removed = result.splice(id, 1);
        console.log('Contato removido: ' + removed[0]['name']);
        console.log('Contatos restantes: ');
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]['name']);
        }


        console.log('<------------ Teste implementação --------------->');
        return this.storage.set(STORAGE_KEY, result);
      } else {
        console.log('Não existes contatos!');
      }
    });
  }

  updateContact(id: number, contact: Contact) {

    console.log("Dentro do updateContact  --> id: " + id);


    return this.getContacts().then(result => {
      id = this.procuraContatoRtIndex(result, id)
      if (result) {

        // console.log('<------------ Teste implementação --------------->');
        //
        // console.log('O contato a ser editado é : ' + result[id]['name']);
        // console.log('O contato a ser editado é : ' + result[id]['id']);
        // console.log('O contato que vai ser salvo : ' + contact['name']);
        // console.log('O contato que vai ser salvo: ' + contact['id']);
        // console.log('index: ' + this.procuraContatoByName(result, contact['name']));
        // console.log('Id : ' + id);
        //

        if (this.procuraContato(result, contact)) {
          console.log('dentro do 1° if');
          if (this.procuraContatoByName(result, result[id]['name']) == this.procuraContatoByName(result, contact['name'])) {
            console.log('Dentro do if ou seja tudo que estiver aqui dentro pertence ao mesmo index');

            result[id]['id'] = contact['id'];
            result[id]['name'] = contact['name'];
            result[id]['gender'] = contact['gender'];

            return this.storage.set(STORAGE_KEY, result);

          } else {
            console.log('dentro do else');
            return  Promise.reject('error');
          }

        }else{

          result[id]['id'] = contact['id'];
          result[id]['name'] = contact['name'];
          result[id]['gender'] = contact['gender'];
          return this.storage.set(STORAGE_KEY, result);
        }

      }

    });
  }

//verefica se o contato ja existe
  procuraContato(array, contato) {
    for (let i = 0; i < array.length; i++) {
      if (contato['name'] == array[i]['name'])
        return true;
    }
    return false;
  }


  procuraContatoRtIndex(array, id) {
    for (let i = 0; i < array.length; i++) {
      if (id == array[i]['id'])
        return i;
    }
    return null;

  }

  procuraContatoByName(array, name) {
    for (let i = 0; i < array.length; i++) {
      if (name == array[i]['name'])
        return i;
    }
    return null;

  }

}

export class Contact {
  name: string;
  gender: string;
  birthday: string;
  employed: boolean;
  salary: string;
  photo: string;

}
