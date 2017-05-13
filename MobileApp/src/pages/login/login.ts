import { Component } from '@angular/core';

import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { UserData } from '../../providers/user-data';
import { ConferenceApp } from '../../app/app.component';

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
  conApp: ConferenceApp;
  constructor(public navCtrl: NavController, public authService: AuthService, public userData: UserData, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    // this.conApp.enableMenu(false);
    console.log("coming into log in page");
    // userData.hasLoggedIn();
   }

  // onLogin(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //     this.userData.login(this.login.username);
  //     this.navCtrl.push(TabsPage);
  //   }
  // }

  // onSignup() {
  //   this.navCtrl.push(SignupPage);
  // }

    doLogin() {
      console.log(this.loginData);
    this.showLoader();
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      console.log(this.data);
      localStorage.setItem('token', this.data.token);
      localStorage.setItem('user', JSON.stringify(this.data.user));

      this.userData.login(this.loginData.username);
      this.navCtrl.setRoot(TabsPage);
      this.conApp.enableMenu(false);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err.json()['message']);
      console.log(err)
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

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
