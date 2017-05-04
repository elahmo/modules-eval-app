import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { NavController } from 'ionic-angular';
// import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
// import { UserData } from '../../providers/user-data';
import { HomePage } from '../home/home'

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signup: {username?: string, password?: string} = {};
  submitted = false;

  loading: any;
  regData = { 'username':'', 'password':'' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {}

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
    this.authService.register(this.regData).then((result) => {
      console.log("register success");
      this.loading.dismiss();
      this.navCtrl.push(HomePage);
      // this.navCtrl.pop();
    }, (err) => {
      console.log("register failed");
      this.loading.dismiss();
      this.presentToast(err);
    });
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
