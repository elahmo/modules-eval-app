import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SearchModulePage } from '../search-module/search-module';
import { ModuleDetailPage } from '../module-detail/module-detail';
import { AuthService } from '../../providers/auth-service';
import { UserData } from '../../providers/user-data';
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
  favoriteText:any;
  myDate: any;
  myUser: any;
  items: any[];
  result: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData, public menu: MenuController, public authService: AuthService) {
    this.myDate = new Date().toISOString();
    this.myUser = {
      name: "Jordan",
      uni: "University of Southampton"     
    }

    console.log("coming into home page");
              // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      console.log('hasLoggedIn is:' + hasLoggedIn);
      this.enableMenu(hasLoggedIn === true);
    }); 

    this.authService.get_module_by_user().then((result) => {
        this.result = result;
        this.items = this.result.user.modules;
        if(this.items.length > 0){
          this.favoriteText = "Favourite Modules";
        }else{
          this.favoriteText = "No favourite modules found...";
        }
        console.log(this.items);
      },(err) => {
        // this.loading.dismiss();
        // this.presentToast(err);
        console.log(err);
      });

    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user == null){
      this.user = {username: ''};
      this.items = [];

    }
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

  enableMenu(loggedIn: boolean) {
    console.log('loggedIn is:' + loggedIn);
    this.menu.enable(loggedIn, 'loggedInView');
    this.menu.enable(!loggedIn, 'loggedOutView');
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
