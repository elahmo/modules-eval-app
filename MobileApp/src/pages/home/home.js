var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SearchModulePage } from '../search-module/search-module';
import { ModuleDetailPage } from '../module-detail/module-detail';
import { UserData } from '../../providers/user-data';
import { MicroServices } from '../../providers/microservices';
import { Store } from "../../providers/store";
var HomePage = (function () {
    function HomePage(store, navCtrl, navParams, userData, menu, microServices) {
        var _this = this;
        this.store = store;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.menu = menu;
        this.microServices = microServices;
        this.myDate = new Date().toISOString();
        // decide which menu items should be hidden by current login status stored in local storage
        this.userData.hasLoggedIn().then(function (hasLoggedIn) {
            _this.enableMenu(hasLoggedIn === true);
        });
        this.store.stateGlobal.subscribe(function (pair) {
            _this.user = pair.state.user;
            _this.items = pair.state.modules;
            if (pair.state.modules.length > 0) {
                _this.favoriteText = "Favourite Modules";
            }
            else {
                _this.favoriteText = "No favourite modules found...";
            }
        });
        if (this.user == null) {
            this.user = { username: '' };
            this.items = [];
        }
    }
    HomePage.prototype.searchModule = function () {
        this.navCtrl.push(SearchModulePage);
    };
    HomePage.prototype.itemSelected = function (item, favd) {
        this.navCtrl.push(ModuleDetailPage, {
            item: item,
            favourited: favd
        });
    };
    HomePage.prototype.enableMenu = function (loggedIn) {
        this.menu.enable(loggedIn, 'loggedInView');
        this.menu.enable(!loggedIn, 'loggedOutView');
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [Store,
        NavController,
        NavParams,
        UserData,
        MenuController,
        MicroServices])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map