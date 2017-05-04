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
  selector: 'page-module-detail',
  templateUrl: 'module-detail.html'
})
export class ModuleDetailPage {
  item: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController){
    	this.item = navParams.get('item');
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
    console.log("Coming into itemFavourite");
    console.log(this.item._id);
    this.authService.favourite(this.item._id).then((result) => {
      // this.loading.dismiss();
      // this.data = result;
      // console.log(this.data);
      // localStorage.setItem('token', this.data.token);
      // localStorage.setItem('user', JSON.stringify(this.data.user));
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      // this.loading.dismiss();
      // this.presentToast(err);
      console.log("failed to add to favourite");
    });
  }
}

// @Component({
//   selector: 'page-detail',
//   templateUrl: 'detail.html'
// })
// export class DetailPage {
// 	item: any;
	
//   constructor(public navCtrl: NavController, public navParams: NavParams) {
//   	this.item = navParams.get('item');
//     console.log(this.item);
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad DetailPage');
//   }

// }
