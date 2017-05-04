import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { AuthService } from '../../providers/auth-service';
import { ModuleDetailPage } from '../module-detail/module-detail';


/*
  Generated class for the SearchModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-module',
  templateUrl: 'search-module.html'
})
export class SearchModulePage {
  queryText = '';
  modules: any;
  result: any;
  authServices = AuthService;
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData, public authService: AuthService) {}
  searchModule() {
      // this.queryText = "";
      this.authService.get_module_by_name(this.queryText).then((result) => {
        this.result = [];
        this.modules = result;
        this.result = this.modules.modules;

      },(err) => {
        // this.loading.dismiss();
        // this.presentToast(err);
        console.log(err);
      });  
  }

 itemSelected(item) {
  	// alert(item.text);
  	this.navCtrl.push(ModuleDetailPage,{
  		item: item
  	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchModulePage');
  }

}
