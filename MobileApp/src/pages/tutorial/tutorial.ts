import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides, ViewController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';

import {State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  tabBar:any;
  showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(
    private store: Store<State, Action>,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
  ) {
    this.tabBar = document.querySelector('.tabbar');
   }

  startApp(seen) {
    //harrdcode to seen to every time user skips, so that it does not pop up
    this.store.sendAction({type: 'SET_TUTORIAL', seen: true});
    //this.store.sendAction({type: 'SET_TUTORIAL', seen: seen});
    this.navCtrl.pop()
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

/*
	ionViewWillEnter() {

	}
*/

  ionViewWillEnter() {
    // the root left menu should be disabled on the tutorial page
    this.viewCtrl.showBackButton(false);
    this.menu.enable(false);
    this.slides.update();
    this.tabBar.style.display = 'none';
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.viewCtrl.showBackButton(true);
    this.menu.enable(true);
    this.tabBar.style.display = '';
  }

}

