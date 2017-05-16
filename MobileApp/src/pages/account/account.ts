import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SupportPage } from '../support/support';
import { UserData } from '../../providers/user-data';

import {State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(
    private store: Store<State, Action>,
    public alertCtrl: AlertController,
    public nav: NavController,
    public userData: UserData
    ) {}

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.username = this.store.state.user['username']
    /*
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
    */
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    localStorage.clear();
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }

  support() {
    this.nav.push(SupportPage);
  }
}
