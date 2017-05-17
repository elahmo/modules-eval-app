import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MicroServices } from '../../providers/microservices';
import { ModuleDetailPage } from '../module-detail/module-detail';

@Component({
  selector: 'page-search-module',
  templateUrl: 'search-module.html'
})
export class SearchModulePage {
  loading: any;
  queryText = '';
  modules: any;
  result: any;
  searchText: any;
  items: any;
  showSearch: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public confData: ConferenceData,
    public microServices: MicroServices,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) {
      this.searchText = "Search for a module...";
      this.showSearch = 'none'
    }

  ionViewWillEnter() {
    this.showSearch = ''
  }

  ionViewWillLeave() {
    this.showSearch = 'none'
  }
  searchModule() {
      if(this.queryText != ""){
        this.microServices.get_module_by_name(this.queryText).then((result) => {
        this.showLoader();
        this.loading.dismiss();
        this.result = [];
        this.modules = result;
        this.result = this.modules.modules;

        if(this.result.length == 0){
          this.loading.dismiss();
          this.searchText = "No modules found";
        }else{
          this.loading.dismiss();
          this.searchText = "";
        }

      },(err) => {
        this.loading.dismiss();
        this.presentToast(err.json()['message']);
      });
      }
  }

 itemSelected(item, favd) {
  	this.microServices.selectItem(item)
  	this.navCtrl.push(ModuleDetailPage, {
      item: item}).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(index-1);
    });
  }

    showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Searching...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.present();
  }

}
