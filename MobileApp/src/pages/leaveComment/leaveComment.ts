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
  current_user_feedback: any;
  favourited: any;

  constructor(
    private store: Store<State, Action>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public microServices: MicroServices
    ){
    //set init values
    	this.module = store.state.current_module.module
      this.favourited = store.state.current_module.favourited
      this.current_user_feedback = this.module.current_user_feedback ? this.module.current_user_feedback : null
      if (this.current_user_feedback !== null) {
        this.rate=this.current_user_feedback['rating'];
        this.feedback=this.current_user_feedback['feedback']; 
      } else {
        this.rate=0;
        this.feedback="";
      }
      //subscribe to changes
      this.store.stateGlobal.subscribe(pair => {
        console.log("selectiin state module detail")
        console.log(pair)
        this.module = pair.state.current_module.module
        this.favourited = pair.state.current_module.favourited
        this.current_user_feedback = this.module.current_user_feedback ? this.module.current_user_feedback : null
        if (this.current_user_feedback !== null) {
          this.rate=this.current_user_feedback['rating'];
          this.feedback=this.current_user_feedback['feedback']; 
        } else {
          this.rate=0;
          this.feedback="";
        }
       })
       console.log("leave comment favourite")
       console.log(this.favourited)
  }

  leaveComment(){
    this.microServices.feedback(this.module, this.favourited, this.module.current_user_feedback, {rating: this.rate, feedback:this.feedback}).then((result)=>{
        //this.navCtrl.push(feedbackPage, {item: this.module});
        this.navCtrl.pop()
      },(err)=>{
        this.presentToast(err.json()['message']);
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

    toast.present();
  }


}
