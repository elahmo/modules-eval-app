import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MicroServices } from '../../providers/microservices';
import { ModuleDetailPage } from '../module-detail/module-detail';

@Component({
  selector: 'page-search-module',
  templateUrl: 'search-module.html'
})
export class SearchModulePage {
  queryText = '';
  modules: any;
  result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData, public microServices: MicroServices) {}
  searchModule() {
      // this.queryText = "";
      this.microServices.get_module_by_name(this.queryText).then((result) => {
        this.result = [];
        this.modules = result;
        this.result = this.modules.modules;

      },(err) => {
        // this.loading.dismiss();
        // this.presentToast(err);
        console.log(err);
      });  
  }

 itemSelected(item, favd) {
  	this.microServices.selectItem(item)
  	this.navCtrl.push(ModuleDetailPage,{
  		item: item,
      favourited: favd
  	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchModulePage');
  }

}
