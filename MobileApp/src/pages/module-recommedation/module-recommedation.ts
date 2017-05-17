import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { RecCourseDetailPage } from '../rec-course-detail/rec-course-detail';

import { MicroServices } from '../../providers/microservices';
import {User, State, Action} from "../../providers//model";
import {Store} from "../../providers/store";


/*
  Generated class for the ModuleRecommedation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-module-recommedation',
  templateUrl: 'module-recommedation.html',
})
export class ModuleRecommedationPage {
  // data: any;
  user:any;
  items: any[];
  course: any[];
  recommendText
  pushed_tut: boolean;
  constructor(public loadingCtrl: LoadingController, private store: Store<State, Action>,public navCtrl: NavController, public navParams: NavParams) {
    // this.data = navParams.get('item');

    //set init values
     this.user = store.state.user
     this.items = store.state.modules

     if(store.state.modules.length > 0){
        this.recommendText = "Recommended Modules";
     }else{
        this.recommendText = "No recommend modules found...";
     }
      //  subscribe to changes
       this.store.stateGlobal.subscribe(pair => {
         this.user = pair.state.user
         this.items = pair.state.modules
         if(pair.state.modules.length > 0){
            this.recommendText = "Recommend Modules";
         }else{
            this.recommendText = "No recommend modules found...";
         }

       })

    if(this.user == null){
      this.user = {username: ''};
      this.items = [];
    }
    console.log(this.items.length);
    // console.log(this.items);
    // console.log(this.items[0]._id.RECOMMENDATIONS);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuleRecommedationPage');
  }

    viewItem(item){
      this.navCtrl.push(RecCourseDetailPage, {
      item:item
    });
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
}

presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 5000
  });

  loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  loading.present();
}

}
