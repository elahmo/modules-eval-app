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
// import { NavController, NavParams } from 'ionic-angular';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MicroServices } from '../../providers/microservices';
import { HomePage } from '../home/home';
import { feedbackPage } from '../feedback/feedback';
import { ModuleNotesPage } from '../module-notes/module-notes';
/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ModuleDetailPage = (function () {
    function ModuleDetailPage(navCtrl, navParams, microServices, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.microServices = microServices;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.item = navParams.get('item');
        this.favourited = navParams.get('favourited');
        console.log(this.item.COURSE_LECTURER);
        if (this.item.COURSE_LECTURER == undefined) {
            this.item.COURSE_LECTURER = { url: '', phone_number: '', name: '', email: '' };
            console.log(this.item.COURSE_LECTURER);
        }
        console.log("coming into detail constructor");
    }
    ModuleDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModuleDetailPage');
    };
    ModuleDetailPage.prototype.itemFavourite = function () {
        var _this = this;
        // alert(item.text);
        // this.navCtrl.push(HomePage,{
        // 	item: item
        // })
        console.log("Coming into itemFavourite");
        console.log(this.item._id);
        this.microServices.favourite(this.item).then(function (result) {
            // this.loading.dismiss();
            // this.data = result;
            // console.log(this.data);
            // localStorage.setItem('token', this.data.token);
            // localStorage.setItem('user', JSON.stringify(this.data.user));
            _this.navCtrl.setRoot(HomePage);
        }, function (err) {
            // this.loading.dismiss();
            // this.presentToast(err);
            console.log("failed to add to favourite");
        });
    };
    ModuleDetailPage.prototype.itemUnfavourite = function () {
        var _this = this;
        console.log("Coming into itemUnfavourite");
        console.log(this.item._id);
        this.microServices.unfavourite(this.item._id).then(function (result) {
            _this.navCtrl.setRoot(HomePage);
        }, function (err) {
            console.log("failed to add to favourite");
        });
    };
    ModuleDetailPage.prototype.itemFeedback = function () {
        console.log("Coming into feedback");
        this.navCtrl.push(feedbackPage, {
            item_id: this.item._id
        });
    };
    ModuleDetailPage.prototype.itemNotes = function () {
        console.log("Coming into ntoes");
        this.navCtrl.push(ModuleNotesPage, {
            item: this.item
            //favourited: favd
        });
    };
    return ModuleDetailPage;
}());
ModuleDetailPage = __decorate([
    Component({
        selector: 'page-module-detail',
        templateUrl: 'module-detail.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MicroServices, LoadingController, ToastController])
], ModuleDetailPage);
export { ModuleDetailPage };
//# sourceMappingURL=module-detail.js.map