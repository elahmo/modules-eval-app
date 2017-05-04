import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams){
    	this.item = navParams.get('item');
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleDetailPage');
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
