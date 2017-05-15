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
import { NavParams, NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { LoginPage } from '../login/login';
var TabsPage = (function () {
    function TabsPage(navParams, navCtrl) {
        this.navCtrl = navCtrl;
        // set the root pages for each tab
        // tab1Root: any = SchedulePage;
        // tab2Root: any = HomePage;
        this.tab1Root = HomePage;
        this.tab2Root = SchedulePage;
        this.tab3Root = SpeakerListPage;
        this.tab4Root = MapPage;
        this.tab5Root = AboutPage;
        this.mySelectedIndex = navParams.data.tabIndex || 0;
        console.log("coming into to Tab");
        console.log(localStorage.getItem("token"));
        if (!localStorage.getItem("token")) {
            console.log("if statment in tab");
            navCtrl.setRoot(LoginPage);
        }
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [NavParams, NavController])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map