import { Component, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { NavController, NavParams, MenuController } from 'ionic-angular';
import {TutorialPage} from '../tutorial/tutorial'
import { SearchModulePage } from '../search-module/search-module';
import { ModuleDetailPage } from '../module-detail/module-detail';
import { UserData } from '../../providers/user-data';

import { MicroServices } from '../../providers/microservices';
import {User, State, Action} from "../../providers//model";
import {Store} from "../../providers/store";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:any;
  favoriteText:any;
  myDate: any;
  myUser: any;
  items: any[];
  result: any;
  pushed_tut: boolean;
  constructor(
    private store: Store<State, Action>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public menu: MenuController,
    public microServices: MicroServices){
    this.myDate = new Date().toISOString();
    this.pushed_tut = false;
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    }); 

    //set init values
     this.user = store.state.user
     this.items = store.state.modules

     if(store.state.modules.length > 0){
        this.favoriteText = "Favourite Modules";
     }else{
        this.favoriteText = "No favourite modules found...";
     }


       //subscribe to changes
       this.store.stateGlobal.subscribe(pair => {
         this.user = pair.state.user
         this.items = pair.state.modules
         if(pair.state.modules.length > 0){
            this.favoriteText = "Favourite Modules";
         }else{
            this.favoriteText = "No favourite modules found...";
         }
       })

    if(this.user == null){
      this.user = {username: ''};
      this.items = [];
    }

  }

    ionViewDidLoad() {
      //pop up tutorial after login
      if(this.store.state.seen_tutorial === false && this.pushed_tut === false){
         console.log("pushing tut 1")
         this.navCtrl.push(TutorialPage)
         this.pushed_tut = true
       }

       this.store.stateGlobal.subscribe(pair => {
         //this is hacky
        if(pair.state.seen_tutorial === false && this.pushed_tut === false){
           console.log("pushing tut 2")
           this.navCtrl.push(TutorialPage)
           this.pushed_tut = true
         }
       })
  }

  searchModule() {
      this.navCtrl.push(SearchModulePage);
  }

  itemSelected(item, favd) {
    this.microServices.selectItem(item)
  	this.navCtrl.push(ModuleDetailPage,{
  		item: item,
      favourited: favd
  	});
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInView');
    this.menu.enable(!loggedIn, 'loggedOutView');
  }
  
/*
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
*/
}
