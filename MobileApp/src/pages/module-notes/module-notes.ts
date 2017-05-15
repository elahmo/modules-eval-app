import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MicroServices } from '../../providers/microservices';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';


/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-module-notes',
  templateUrl: 'module-notes.html',

})
export class ModuleNotesPage {
  item: any;
  favourited: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public microServices: MicroServices, public loadingCtrl: LoadingController, private toastCtrl: ToastController){
    	this.item = navParams.get('item');
      console.log(this.item.COURSE_LECTURER);
      if(this.item.COURSE_LECTURER == undefined){
        this.item.COURSE_LECTURER = {url:'',phone_number:'', name:'',email:''};
        console.log(this.item.COURSE_LECTURER);
    }
    console.log("coming into detail constructor");
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleDetailPage');
  }

  itemFavourite() {
  	// alert(item.text);
  	// this.navCtrl.push(HomePage,{
  	// 	item: item
  	// })
    console.log("Coming into itemNotes");
    console.log(this.item._id);
    this.microServices.favourite(this.item._id).then((result) => {
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
    this.microServices.unfavourite(this.item._id).then((result) => {
      this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log("failed to add to favourite");
      });
    }
}
