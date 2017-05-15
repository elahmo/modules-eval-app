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
import { feedbackPage } from '../feedback/feedback';
import { MicroServices } from '../../providers/microservices';
import { Store } from "../../providers/store";
/*
  Generated class for the ModuleDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var leaveCommentPage = (function () {
    function leaveCommentPage(store, navCtrl, navParams, loadingCtrl, toastCtrl, microServices) {
        this.store = store;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.microServices = microServices;
        this.module = navParams.get('module');
        this.rate = 0;
    }
    /*
        itemFeedback(){
        this.authService.get_module_by_id(this.item._id).then((result) => {
          // this.navCtrl.setRoot(HomePage);
          this.data = result;
        this.navCtrl.push(feedbackPage,{
          item: this.data.module,
        });
          }, (err) => {
            console.log("failed to add to favourite");
          });
        }
    */
    leaveCommentPage.prototype.leaveComment = function () {
        var _this = this;
        this.store.sendAction({ type: 'SET_USER', user: { username: this.feedback } });
        this.microServices.feedback(this.module._id, { rating: this.rate, feedback: this.feedback }).then(function (result) {
            console.log(result);
            _this.navCtrl.push(feedbackPage, { item: _this.module });
        }, function (err) {
            _this.presentToast(err.json()['message']);
            console.log(err);
        });
    };
    leaveCommentPage.prototype.rating = function (event) {
        this.rate = event;
    };
    leaveCommentPage.prototype.presentToast = function (msg) {
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
    return leaveCommentPage;
}());
leaveCommentPage = __decorate([
    Component({
        selector: 'leaveComment',
        templateUrl: 'leaveComment.html'
    }),
    __metadata("design:paramtypes", [Store,
        NavController,
        NavParams,
        LoadingController,
        ToastController,
        MicroServices])
], leaveCommentPage);
export { leaveCommentPage };
//# sourceMappingURL=leaveComment.js.map