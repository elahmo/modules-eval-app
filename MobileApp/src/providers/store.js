var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Observable, Subject, Scheduler } from "rxjs";
import { of } from "rxjs/observable/of";
import { Injectable } from "@angular/core";
var Store = (function () {
    function Store(reducer, state) {
        var _this = this;
        this.reducer = reducer;
        this.state = state;
        this.actions = new Subject();
        this.stateGlobal = new Subject();
        this.actions.observeOn(Scheduler.async).mergeMap(function (a) {
            var state = reducer(_this, _this.state, a.action);
            var obs = state instanceof Observable ? state : of(state);
            return obs.map(function (state) { return ({ state: state, result: a.result }); });
        }).subscribe(function (pair) {
            _this.state = pair.state;
            var res = new Subject();
            _this.stateGlobal.next({ state: _this.state });
            pair.result.next(true);
            pair.result.complete();
        });
    }
    Store.prototype.sendAction = function (action) {
        var res = new Subject();
        this.actions.next({ action: action, result: res });
        return res;
    };
    return Store;
}());
Store = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Function, Object])
], Store);
export { Store };
//# sourceMappingURL=store.js.map