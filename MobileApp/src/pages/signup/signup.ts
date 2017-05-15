import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { NavController } from 'ionic-angular';
// import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MicroServices } from '../../providers/microservices';
import { TabsPage } from '../tabs/tabs';
// import { UserData } from '../../providers/user-data';
import { HomePage } from '../home/home'

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signup: {username?: string, password?: string} = {};
  submitted = false;

  loading: any;
  regData = { 'username':'', 'password':'' };
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData, public microServices: MicroServices, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

  // onSignup(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //     this.userData.signup(this.signup.username);
  //     this.navCtrl.push(TabsPage);
  //   }
  // }

    doSignup() {
      console.log(this.regData);
    this.showLoader();
    this.microServices.register(this.regData).then((result) => {
      console.log("register success");
      this.loading.dismiss();
      this.userData.signup(this.regData.username);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err.json()['message']);
      console.log(err)
    });
  }

    showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Signing Up...'
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
