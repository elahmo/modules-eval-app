import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController){
    	this.module = navParams.get('item');
      this.feedbacks = this.module.FEEDBACKS;
      console.log(this.feedbacks);

      // this.item = navParams.get('module');

  }
}