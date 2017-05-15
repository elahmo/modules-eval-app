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
import { leaveCommentPage } from '../leaveComment/leaveComment';
/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var feedbackPage = (function () {
    function feedbackPage(navCtrl, navParams, microServices, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.microServices = microServices;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.showLoader('Loading Feedback..');
        this.module = null;
        this.feedbacks = null;
        this.microServices.get_module_by_id(navParams.get('item_id')).then(function (result) {
            _this.module = result['module'];
            _this.feedbacks = _this.module.FEEDBACKS;
            _this.loading.dismiss();
        }, function (err) {
            _this.module = null;
            _this.feedbacks = null;
            _this.loading.dismiss();
            _this.presentToast(err.json()['message']);
            console.log("failed to fetch module");
        });
    }
    feedbackPage.prototype.leaveComment = function () {
        this.navCtrl.push(leaveCommentPage, { module: this.module });
    };
    feedbackPage.prototype.showLoader = function (text) {
        this.loading = this.loadingCtrl.create({
            content: text
        });
        this.loading.present();
    };
    feedbackPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    return feedbackPage;
}());
feedbackPage = __decorate([
    Component({
        selector: 'feedback',
        templateUrl: 'feedback.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, MicroServices, LoadingController, ToastController])
], feedbackPage);
export { feedbackPage };
//# sourceMappingURL=feedback.js.map