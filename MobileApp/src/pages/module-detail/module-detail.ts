import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { feedbackPage } from '../feedback/feedback';
import { ModuleNotesPage } from '../module-notes/module-notes';
import {RatingComponent} from '../leaveComment/rating';
import { ModuleRecommedationPage } from '../module-recommedation/module-recommedation';

import { MicroServices } from '../../providers/microservices';
import {State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

@Component({
  selector: 'page-module-detail',
  templateUrl: 'module-detail.html'
})
export class ModuleDetailPage {
  item: any;
  favourited: boolean;
  data: any;

  constructor(
    private store: Store<State, Action>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public microServices: MicroServices,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ){
    	this.item = navParams.get('item');
      this.favourited = navParams.get('favourited')
      if(this.item.COURSE_LECTURER == undefined){
        this.item.COURSE_LECTURER = {url:'',phone_number:'', name:'',email:''};
      }
     this.store.stateGlobal.subscribe(pair => {
        console.log("selectiin state module detail")
        console.log(pair)
        this.item = pair.state.current_module.module
        this.favourited = pair.state.current_module.favourited
        if(this.item.COURSE_LECTURER == undefined){
          this.item.COURSE_LECTURER = {url:'',phone_number:'', name:'',email:''};
         }
       })
  }

  itemFavourite() {
    this.microServices.favourite(this.item).then((result) => {
      //this.navCtrl.setRoot(HomePage);
      }, (err) => {
        this.presentToast(err.json()['message']);
      });
    }

    itemUnfavourite() {
    this.microServices.unfavourite(this.item).then((result) => {
      //this.navCtrl.setRoot(HomePage);
      }, (err) => {
        this.presentToast(err.json()['message']);
      });
    }

    itemFeedback(){
      this.navCtrl.push(feedbackPage,{
    		item: this.item,
        favourited: this.favourited
  	  });
    }

    itemNotes() {
    	this.navCtrl.push(ModuleNotesPage,{
    		item: this.item,
    	});
    }

    moduleRecommendation(){
      this.navCtrl.push(ModuleRecommedationPage,{
        item: this.item.RECOMMENDATIONS,
      });
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
