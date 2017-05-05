import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchModulePage } from '../search-module/search-module';
import { ModuleDetailPage } from '../module-detail/module-detail';
import { AuthService } from '../../providers/auth-service';

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
  result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService) {
    this.myDate = new Date().toISOString();
    this.myUser = {
      name: "Jordan",
      uni: "University of Southampton"      
    }

    this.authService.get_module_by_user().then((result) => {
        this.result = result;
        this.items = this.result.user.modules;
        console.log(this.items);
      },(err) => {
        // this.loading.dismiss();
        // this.presentToast(err);
        console.log(err);
      });

    this.user = JSON.parse(localStorage.getItem('user'));
    
    // this.items = [];
    // this.items =  this.user.modules;

    // console.log(this.items);

    // if(this.user.modules.length != 0){
    //       for(var i = 0; i < this.user.modules; i++){
    //         this.items.push({
    //           id: this.user.modules[i]._id.COURSE_CODE
    //         });
    //       }
    // }else{
    //   this.items.push({
    //           id: "No modules chosen"
    //   });
    // }
  }

  searchModule() {
      this.navCtrl.push(SearchModulePage);
  }

  itemSelected(item, favd) {
  	this.navCtrl.push(ModuleDetailPage,{
  		item: item,
      favourited: favd
  	});
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
