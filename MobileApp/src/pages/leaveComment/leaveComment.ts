import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { feedbackPage } from '../feedback/feedback';
import {RatingComponent} from 'rating';
/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'leaveComment',
  templateUrl: 'leaveComment.html'
})
export class leaveCommentPage {
  module: any;
  feedback: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController){
    	this.module = navParams.get('module');
  }

  leaveComment(){
    this.authService.feedback(this.module._id, {rating:4, feedback:this.feedback}).then((result)=>{
      console.log(result)},(err)=>{
        this.presentToast(err.json()['message']);
        console.log(err)
    });
    this.navCtrl.push(feedbackPage, {item: this.module});
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
