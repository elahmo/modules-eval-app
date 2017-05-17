import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { leaveCommentPage } from '../leaveComment/leaveComment';
import {RatingComponent} from '../leaveComment/rating';
import { MicroServices } from '../../providers/microservices';
import {State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

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
  test_string: any;
  need_refetch: boolean;
  favourited:any;

  constructor(
    private store: Store<State, Action>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public microServices: MicroServices,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    ){
    //get init values
    this.module = store.state.current_module.module;
    this.feedbacks = null
    this.favourited = store.state.current_module.favourited

    //subscribe to changes
    this.store.stateGlobal.subscribe(pair => {
        this.module = pair.state.current_module.module
        this.favourited = pair.state.current_module.favourited
        this.feedbacks = pair.state.current_module.module['FEEDBACKS']
      })

    //if true, feedbacks exist, if false, feedbacks dont exist
    if(this.module.FEEDBACKS[0] !== undefined ){
       //if true. feedbacks exist and are fetched, if false feedbacks or not fetched
      if(this.module.FEEDBACKS[0]['_id'].username !== undefined) {
         this.need_refetch = false
      } else {
         this.need_refetch = true
      }
    } else {
      this.need_refetch = false
    }

    if (this.need_refetch) {
      console.log("Fetching feedback");
      this.showLoader('Loading Feedback..');
      this.microServices.fetch_feedback(this.module, this.favourited).then((result) => {
        this.loading.dismiss();
        }, (err) => {
        this.feedbacks = null;
        this.loading.dismiss();
        this.presentToast(err.json()['message']);
       });
    } else {
      this.feedbacks = this.module.FEEDBACKS;
    }

   }

  leaveComment(){
    this.navCtrl.push(leaveCommentPage);
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

