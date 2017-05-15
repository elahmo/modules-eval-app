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
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { UserData } from '../../providers/user-data';
import { MicroServices } from '../../providers/microservices';
import { Store } from "../../providers/store";
var LoginPage = (function () {
    function LoginPage(store, navCtrl, microServices, userData, loadingCtrl, toastCtrl) {
        this.store = store;
        this.navCtrl = navCtrl;
        this.microServices = microServices;
        this.userData = userData;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.login = {};
        this.submitted = false;
        this.loginData = { username: '', password: '' };
    }
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.showLoader();
        this.microServices.login(this.loginData).then(function (result) {
            _this.loading.dismiss();
            _this.userData.login(_this.loginData.username);
            _this.navCtrl.setRoot(TabsPage);
            _this.conApp.enableMenu(false);
        }, function (err) {
            _this.loading.dismiss();
            _this.presentToast(err.json()['message']);
        });
    };
    LoginPage.prototype.doSignup = function () {
        this.navCtrl.push(SignupPage);
    };
    LoginPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    LoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toast.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-user',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [Store,
        NavController,
        MicroServices,
        UserData,
        LoadingController,
        ToastController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map