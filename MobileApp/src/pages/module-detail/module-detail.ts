import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { feedbackPage } from '../feedback/feedback';
import { ModuleNotesPage } from '../module-notes/module-notes';
import {RatingComponent} from '../leaveComment/rating';
/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-module-detail',
  templateUrl: 'module-detail.html'
})
export class ModuleDetailPage {
  item: any;
  favourited: boolean;
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController){
    	this.item = navParams.get('item');
      this.favourited = navParams.get('favourited')
      console.log(this.item.COURSE_LECTURER);
      if(this.item.COURSE_LECTURER == undefined){
        this.item.COURSE_LECTURER = {url:'',phone_number:'', name:'',email:''};
        console.log(this.item.COURSE_LECTURER);
    }
    console.log("coming into detail constructor");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleDetailPage');
  }

  itemFavourite() {
  	// alert(item.text);
  	// this.navCtrl.push(HomePage,{
  	// 	item: item
  	// })
    console.log("Coming into itemFavourite");
    console.log(this.item._id);
    this.authService.favourite(this.item._id).then((result) => {
      // this.loading.dismiss();
      // this.data = result;
      // console.log(this.data);
      // localStorage.setItem('token', this.data.token);
      // localStorage.setItem('user', JSON.stringify(this.data.user));
      this.navCtrl.setRoot(HomePage);
      }, (err) => {
        // this.loading.dismiss();
        // this.presentToast(err);
        console.log("failed to add to favourite");
      });
    }

    itemUnfavourite() {

    console.log("Coming into itemUnfavourite");
    console.log(this.item._id);
    this.authService.unfavourite(this.item._id).then((result) => {
      this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log("failed to add to favourite");
      });
    }

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

    itemNotes() {
    	this.navCtrl.push(ModuleNotesPage,{
    		item: this.item
        //favourited: favd
    	});
    }
}
