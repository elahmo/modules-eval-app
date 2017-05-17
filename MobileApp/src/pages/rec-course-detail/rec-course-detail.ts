import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the RecCourseDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rec-course-detail',
  templateUrl: 'rec-course-detail.html'
})
export class RecCourseDetailPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
    // console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecCourseDetailPage');
  }

}
