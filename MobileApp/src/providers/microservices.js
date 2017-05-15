var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from "../providers/store";
import 'rxjs/add/operator/map';
// let apiUrl = 'http://localhost:8080/api/';
var apiUrl = 'https://modules-eval-app.herokuapp.com/api/';
var MicroServices = (function () {
    function MicroServices(store, http) {
        this.store = store;
        this.http = http;
    }
    // login function
    MicroServices.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post(apiUrl + 'auth', JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                //when sucesfull, update the store with user data
                var data = res.json();
                _this.store.sendAction({ type: 'SET_USER', user: data.user });
                _this.store.sendAction({ type: 'SET_MODULES', modules: data.user.modules });
                localStorage.setItem('token', data.token);
                resolve(data);
            }, function (err) {
                //when unsuccessful, dont save anything
                reject(err);
            });
        });
    };
    // register function
    MicroServices.prototype.register = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post(apiUrl + 'signup', JSON.stringify(data), { headers: headers })
                .subscribe(function (res) {
                //when sucesfull, update the store with user data
                var data = res.json();
                _this.store.sendAction({ type: 'SET_USER', user: data.user });
                _this.store.sendAction({ type: 'SET_MODULES', modules: data.user.modules });
                localStorage.setItem('token', data.token);
                resolve(res.json());
            }, function (err) {
                //when unsuccessful, dont save anything
                reject(err);
            });
        });
    };
    MicroServices.prototype.sync_user_and_modules = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Authorization', localStorage.getItem('token'));
            _this.http.get(apiUrl + 'user', { headers: headers })
                .subscribe(function (res) {
                //when sucesfull, update the store with user data
                var data = res.json();
                _this.store.sendAction({ type: 'SET_USER', user: data.user });
                _this.store.sendAction({ type: 'SET_MODULES', modules: data.user.modules });
                resolve(res.json());
            }, function (err) {
                //when unsuccessful, dont save anything
                reject(err);
            });
        });
    };
    MicroServices.prototype.get_module_by_id = function (moduleId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Authorization', localStorage.getItem('token'));
            _this.http.get(apiUrl + 'modules/' + moduleId, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    MicroServices.prototype.get_module_by_name = function (queryText) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Authorization', localStorage.getItem('token'));
            _this.http.get(apiUrl + 'modules/find/' + queryText, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
                console.log(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    MicroServices.prototype.favourite = function (module) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Authorization', localStorage.getItem('token'));
            _this.http.post(apiUrl + 'favourite/' + module._id, {}, { headers: headers })
                .subscribe(function (res) {
                _this.store.sendAction({ type: 'ADD_MODULE', module: module });
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    MicroServices.prototype.unfavourite = function (moduleId) {
        var _this = this;
        console.log("coming into unfavourite!");
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Authorization', localStorage.getItem('token'));
            _this.http.post(apiUrl + 'unfavourite/' + moduleId, {}, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
                console.log(res.json());
                console.log("module unfavorited successfully");
            }, function (err) {
                console.log("failed to unfavorite module");
                reject(err);
            });
        });
    };
    MicroServices.prototype.feedback = function (moduleId, data) {
        var _this = this;
        console.log("coming into feedback!");
        console.log(localStorage.getItem('token'));
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', localStorage.getItem('token'));
            console.log(data);
            console.log(moduleId);
            _this.http.put(apiUrl + 'feedback/' + moduleId, JSON.stringify(data), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
                console.log(res.json());
                console.log("module feedback added successfully");
            }, function (err) {
                console.log("failed to add feedback module");
                reject(err);
            });
        });
    };
    MicroServices.prototype.notes = function (moduleId, data) {
        var _this = this;
        console.log("coming into notes!");
        console.log(localStorage.getItem('token'));
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', localStorage.getItem('token'));
            _this.http.put(apiUrl + 'notes/' + moduleId, JSON.stringify(data), { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
                console.log(res.json());
                console.log("module notes added successfully");
            }, function (err) {
                console.log("failed to add module notes");
                reject(err);
            });
        });
    };
    return MicroServices;
}());
MicroServices = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Store,
        Http])
], MicroServices);
export { MicroServices };
//# sourceMappingURL=microservices.js.map