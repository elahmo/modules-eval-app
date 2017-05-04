import { Component } from '@angular/core';

import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

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

  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

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
      localStorage.setItem('user', this.data.user);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
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
