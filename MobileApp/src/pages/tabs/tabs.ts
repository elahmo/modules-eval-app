import { Component, ViewChild} from '@angular/core';

import { NavParams, NavController, Nav } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
    // @ViewChild(Nav) nav: Nav;
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = SchedulePage;
  tab3Root: any = SpeakerListPage;
  tab4Root: any = MapPage;
  tab5Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams, public navCtrl: NavController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    console.log("coming into to Tab");
    console.log(localStorage.getItem("token"));
      if(!localStorage.getItem("token")) {
        console.log("direct to login page");
      //  navCtrl.setRoot(LoginPage);
      // this.nav.setRoot(LoginPage).catch(() => {
      // });
      navCtrl.push(LoginPage).then(() => {
      // this.storage.set('hasSeenTutorial', 'true');
    })
    }
  }


}
