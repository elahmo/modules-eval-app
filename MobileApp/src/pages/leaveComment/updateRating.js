var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
var updateRating = (function () {
    function updateRating() {
        this.score = 1;
        this.max = 5;
        this.iconEmpty = 'star-outline';
        this.iconHalf = 'star-half';
        this.iconFull = 'star';
        this.update = new EventEmitter();
    }
    updateRating.prototype.onUpdate = function (score) {
        this.score = score;
        this.update.emit(score);
    };
    updateRating.prototype.icons = function () {
        var step = 0.5;
        var score = Math.ceil(this.score / step) * step;
        var icons = [];
        for (var i = 1; i <= this.max; i++) {
            if (i <= score) {
                icons.push(this.iconFull);
            }
            else if (i - step <= score) {
                icons.push(this.iconHalf);
            }
            else {
                icons.push(this.iconEmpty);
            }
        }
        return icons;
    };
    return updateRating;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], updateRating.prototype, "score", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], updateRating.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], updateRating.prototype, "iconEmpty", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], updateRating.prototype, "iconHalf", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], updateRating.prototype, "iconFull", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], updateRating.prototype, "update", void 0);
updateRating = __decorate([
    Component({
        selector: 'update-rating',
        template: "\n\t\t<ul>\n\t\t\t<li *ngFor=\"let icon of icons(); let i = index\" (click)=\"onUpdate(i+1)\">\n\t\t\t\t<ion-icon [name]=\"icon\"></ion-icon>\n\t\t\t</li>\n\t\t</ul>\n\t",
        styles: ["\n\t\tul {\n\t\t\tdisplay: inline-block;\n\t\t\tlist-style: none;\n\t\t\tpadding: 0;\n\t\t\tmargin: 0;\n\t\t}\n\t\tli {\n\t\t\tdisplay: inline-block;\n\t\t\tcolor: #ffa500;\n\t\t\tfont-size: 2em;\n\t\t}\n\t\tli + li {\n\t\t\tmargin-left: .1em;\n\t\t}\n\t"],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], updateRating);
export { updateRating };
//# sourceMappingURL=updateRating.js.map