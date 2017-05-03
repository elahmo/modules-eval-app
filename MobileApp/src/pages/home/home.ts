import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDate: any;
  myUser: any;
  items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myDate = new Date().toISOString();
    this.myUser = {
      name: "Jordan",
      uni: "University of Southampton"      
    }
    
      this.items = [];
    for(var i = 0; i < 5; i++){
      this.items.push({
        text: 'Module ' + i,
        id: 'Comp 320' + i
      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
