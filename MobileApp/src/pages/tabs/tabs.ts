import { Component } from '@angular/core';

import { NavParams, NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { ModuleRecommedationPage } from '../module-recommedation/module-recommedation';

import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // set the root pages for each tab
  // tab1Root: any = SchedulePage;
  // tab2Root: any = HomePage;
  tab1Root: any = HomePage;
  tab2Root: any = SchedulePage;
  tab3Root: any = SpeakerListPage;
  tab4Root: any = MapPage;
  tab5Root: any = ModuleRecommedationPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams, public navCtrl: NavController, public keyboard: Keyboard, public platform: Platform) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    console.log("coming into to Tab");
    console.log(localStorage.getItem("token"));
      if(!localStorage.getItem("token")) {
        console.log("if statment in tab");
      navCtrl.setRoot(LoginPage);
    }

    platform.ready().then(() => {
            this.keyboard.onKeyboardShow().subscribe(() => {
                document.body.classList.add('keyboard-is-open');
            });

            this.keyboard.onKeyboardHide().subscribe(() => {
                document.body.classList.remove('keyboard-is-open');
            });
    });

  }


}
