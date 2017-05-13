import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { leaveCommentPage } from '../leaveComment/leaveComment';
/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'feedback',
  templateUrl: 'feedback.html'
})
export class feedbackPage {
  feedbacks: any;
  item: any;
  cours: string;
  user:any;
  module: any;
  loading: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: 
    AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController){
    this.showLoader('Loading Feedback..');
    this.module = null;
    this.feedbacks = null;
    this.authService.get_module_by_id( navParams.get('item_id')).then((result) => {
      this.module = result['module'];
      this.feedbacks = this.module.FEEDBACKS;
      this.loading.dismiss();
      }, (err) => {
      this.module = null;
      this.feedbacks = null;
      this.loading.dismiss();
      this.presentToast(err.json()['message']);
      console.log("failed to fetch module");
      });

    }

  leaveComment(){
    this.navCtrl.push(leaveCommentPage,{module: this.module});
  }



  showLoader(text){
    this.loading = this.loadingCtrl.create({
        content: text
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

