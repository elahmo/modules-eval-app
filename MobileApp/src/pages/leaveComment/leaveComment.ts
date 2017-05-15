import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { feedbackPage } from '../feedback/feedback';
import {updateRating} from 'updateRating';
import { MicroServices } from '../../providers/microservices';
import {User, State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

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
  rate: any;
  constructor(
    private store: Store<State, Action>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public microServices: MicroServices){
    	this.module = navParams.get('module');
      this.rate=0;
  }


/*
    itemFeedback(){
    this.authService.get_module_by_id(this.item._id).then((result) => {
      // this.navCtrl.setRoot(HomePage);
      this.data = result;
    this.navCtrl.push(feedbackPage,{
      item: this.data.module,
    });
      }, (err) => {
        console.log("failed to add to favourite");
      });
    }
*/

  leaveComment(){
    this.store.sendAction({type: 'SET_USER', user: {username:  this.feedback}});
    this.microServices.feedback(this.module._id, {rating: this.rate, feedback:this.feedback}).then((result)=>{
        console.log(result)
        this.navCtrl.push(feedbackPage, {item: this.module});
      },(err)=>{
        this.presentToast(err.json()['message']);
        console.log(err)
      });
  }

  rating(event){
    this.rate =event;
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
