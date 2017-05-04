import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { AuthService } from '../../providers/auth-service';


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
  authServices = AuthService;
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: ConferenceData, public authService: AuthService) {}
  searchModule() {
      // this.queryText = "";
      this.authService.get_module_by_name(this.queryText);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchModulePage');
  }

}
