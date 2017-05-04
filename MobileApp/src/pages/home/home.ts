import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchModulePage } from '../search-module/search-module';


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
  user:any;
  myDate: any;
  myUser: any;
  items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myDate = new Date().toISOString();
    this.myUser = {
      name: "Jordan",
      uni: "University of Southampton"      
    }

    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.modules[0]._id.COURSE_CODE);
    console.log(this.user.modules[0].local_rating);
    
    this.items = [];
    if(this.user.modules.length === 0){
          for(var i = 0; i < this.user.modules; i++){
            this.items.push({
              id: this.user.modules[i]._id.COURSE_CODE
            });
          }
    }else{
      this.items.push({
              id: "No modules chosen"
      });
    }
  }

  searchModule() {
      this.navCtrl.push(SearchModulePage);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
