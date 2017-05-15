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
import { NavController, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { MicroServices } from '../../providers/microservices';
import { ModuleDetailPage } from '../module-detail/module-detail';
/*
  Generated class for the SearchModule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SearchModulePage = (function () {
    function SearchModulePage(navCtrl, navParams, confData, microServices) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.confData = confData;
        this.microServices = microServices;
        this.queryText = '';
    }
    SearchModulePage.prototype.searchModule = function () {
        var _this = this;
        // this.queryText = "";
        this.microServices.get_module_by_name(this.queryText).then(function (result) {
            _this.result = [];
            _this.modules = result;
            _this.result = _this.modules.modules;
        }, function (err) {
            // this.loading.dismiss();
            // this.presentToast(err);
            console.log(err);
        });
    };
    SearchModulePage.prototype.itemSelected = function (item, favd) {
        // alert(item.text);
        this.navCtrl.push(ModuleDetailPage, {
            item: item,
            favourited: favd
        });
    };
    SearchModulePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchModulePage');
    };
    return SearchModulePage;
}());
SearchModulePage = __decorate([
    Component({
        selector: 'page-search-module',
        templateUrl: 'search-module.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ConferenceData, MicroServices])
], SearchModulePage);
export { SearchModulePage };
//# sourceMappingURL=search-module.js.map