import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ModuleRecommedation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-module-recommedation',
  templateUrl: 'module-recommedation.html'
})
export class ModuleRecommedationPage {
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleRecommedationPage');
  }

}
