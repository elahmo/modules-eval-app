import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { feedbackPage } from '../pages/feedback/feedback';
import { leaveCommentPage } from '../pages/leaveComment/leaveComment';
import {RatingComponent} from '../pages/leaveComment/rating';
import {updateRating} from '../pages/leaveComment/updateRating';
import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SchedulePage } from '../pages/schedule/schedule';
import { SupportPage } from '../pages/support/support';
import { SearchModulePage } from '../pages/search-module/search-module';
import { RecCourseDetailPage } from '../pages/rec-course-detail/rec-course-detail';
import { ModuleRecommedationPage } from '../pages/module-recommedation/module-recommedation';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import {State, Action} from "../providers//model";
import {Store} from "../providers/store";

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    // { title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, icon: 'calendar' },
    // { title: 'Home', component: TabsPage, tabComponent: HomePage, index: 1, icon: 'home' },
    { title: 'Home', component: TabsPage, tabComponent: HomePage, icon: 'home'},
    { title: 'Schedule', component: TabsPage, tabComponent: SchedulePage, index: 1, icon: 'calendar' },
    { title: 'Map', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    { title: 'Recomendations', component: TabsPage, tabComponent: ModuleRecommedationPage, index: 3, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Support', component: SupportPage, icon: 'help' },
    { title: 'About', component: AboutPage, icon: 'school' },
    { title: 'Logout', component: LoginPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Support', component: SupportPage, icon: 'help' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;

  constructor(
    private store: Store<State, Action>,
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {
    console.log("coming into constructor of app.component");
    // Check if the user has already seen the tutorial
    this.rootPage = LoginPage

  }
    
  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index }).catch(() => {
        console.log("Didn't set nav root");
      });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.push(TutorialPage);
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

}
