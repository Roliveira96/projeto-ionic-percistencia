import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ContactsListPage } from '../contacts-list/contacts-list';
import { CreateContactPage } from '../create-contact/create-contact';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab9Root = ContactsListPage;
  tab10Root = CreateContactPage;

  constructor() {

  }
}
