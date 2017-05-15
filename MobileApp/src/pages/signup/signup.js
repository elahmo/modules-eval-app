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
// import { NavController } from 'ionic-angular';
// import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MicroServices } from '../../providers/microservices';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, userData, microServices, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userData = userData;
        this.microServices = microServices;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.signup = {};
        this.submitted = false;
        this.regData = { 'username': '', 'password': '' };
    }
    // onSignup(form: NgForm) {
    //   this.submitted = true;
    //   if (form.valid) {
    //     this.userData.signup(this.signup.username);
    //     this.navCtrl.push(TabsPage);
    //   }
    // }
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        console.log(this.regData);
        this.showLoader();
        this.microServices.register(this.regData).then(function (result) {
            console.log("register success");
            _this.loading.dismiss();
            _this.userData.signup(_this.regData.username);
            _this.navCtrl.setRoot(TabsPage);
        }, function (err) {
            _this.loading.dismiss();
            _this.presentToast(err.json()['message']);
            console.log(err);
        });
    };
    SignupPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Signing Up...'
        });
        this.loading.present();
    };
    SignupPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.present();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Component({
        selector: 'page-user',
        templateUrl: 'signup.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, UserData, MicroServices, LoadingController, ToastController])
], SignupPage);
export { SignupPage };
//# sourceMappingURL=signup.js.map