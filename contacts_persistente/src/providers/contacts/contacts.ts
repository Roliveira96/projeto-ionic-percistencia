import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import {renderComponent} from "@angular/core/src/render3";
const STORAGE_KEY = 'contacts';


@Injectable()
export class ContactsProvider {

  constructor(public storage: Storage) {
    console.log('Hello ContactsProvider Provider');

  }


  getContacts(){
    return this.storage.get(STORAGE_KEY);
  }

  getContact(id){
    console.log('Dentro do getContact id:'+id);

    id = id -1;
  return   this.getContacts().then(result =>{
      console.log('Teste do getContacts --> ' + result[id]['name']);
      return result[id];
    }).catch(      erro => {console.log("error o contato não foi localizado! Ou ocorreu um erro interno") }    );
  }


  addContact(data){
    return this.getContacts().then(result => {
      if (result) {
        data['id'] = result.length + 1;

        if(!this.procuraContato(result,data)) {
          console.log('Deu certo o contato está sendo salvo');
          result.push(data);

          return this.storage.set(STORAGE_KEY, result);
        }else{
          console.log('Não deu certo o contato NÂO está sendo salvo');

          return Promise.reject('Nome existente!');

        }

      } else {
        data['id'] = 1;
        return this.storage.set(STORAGE_KEY, [data]);
      }
    });
  }

  destroyContact(id: number){

  console.log("Dentro do destroycontact  --> id: " + id);

  id = id - 1;


  console.log('<----------- Teste Array remove --------------->');
    var arr = ['ricardo', 'bruna', 'carlos', 'maria'];
    console.log(arr);
    var removed = arr.splice(1,1);
    console.log(arr);
    console.log(removed);
    console.log('<----------- Teste Array remove --------------->');


    return this.getContacts().then(result => {
      if (result) {

        console.log('<------------ Teste implementação --------------->');

        console.log('O contato a ser deletado é : '+ result[id]['name']);
        let removed = result.splice(id,1);
        console.log('Contato removido: '+removed[0]['name']);
        console.log('Contatos restantes: ');
        for (let i = 0; i < result.length; i++) {
          console.log( result[i]['name']);
        }



        console.log('<------------ Teste implementação --------------->');
        return this.storage.set(STORAGE_KEY, result);
      } else {
        console.log('Não existes contatos!');
      }
    });
  }

  updateContact(id: number, contact : Contact){

  console.log("Dentro do updateContact  --> id: " + id);

  id = id - 1;


    return this.getContacts().then(result => {
      if (result) {

        console.log('<------------ Teste implementação --------------->');

        console.log('O contato a ser editado é : '+ result[id]['name']);
        console.log('O contato a ser editado é : '+ contact['name']);
        if (this.procuraContato(result,contact) ){
          console.log('teste');
        }



        console.log('<------------ Teste implementação --------------->');
        return this.storage.set(STORAGE_KEY, result);


      } else {
        console.log('Não existes contatos!');
      }
    });
  }

//verefica se o contato ja existe
  procuraContato(array , contato) {
    for (let i = 0; i < array.length ; i++) {
      if (contato['name'] == array[i]['name'])
        return true;
    }
    return false;

  }

}
export class Contact {
  id: number;
  name: string;
  gender: string;
}
