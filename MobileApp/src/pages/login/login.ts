import { Component} from '@angular/core';

import { NavController, LoadingController, ToastController, MenuController, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { UserData } from '../../providers/user-data';
import { ConferenceApp } from '../../app/app.component';

import { MicroServices } from '../../providers/microservices';
import {State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  loading: any;
  loginData = { username:'', password:'' };
  data: any;

  constructor(
      private store: Store<State, Action>,
      public viewCtrl: ViewController,
      public menu: MenuController,
      public navCtrl: NavController,
      public microServices: MicroServices,
      public userData: UserData,
      public loadingCtrl: LoadingController,
      private toastCtrl: ToastController
      ) {}

  ionViewWillEnter() {
     //disable menu on the login page - use seen tutorial as indicator if app has been already accesed or not. if app is expanded, this will be misleading
     if (this.store.state.seen_tutorial === false) {
        console.log("not setting timeout")
         this.menu.enable(false);
      } else{
        console.log("setting timeout")
        setTimeout(
          () => { this.menu.enable(false); },
          150);
      }
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  doLogin() {
    this.showLoader();
    this.microServices.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.userData.login(this.loginData.username);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err.json()['message']);
    });
  }

  doSignup() {
    this.navCtrl.push(SignupPage);
  }

    showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }
}
