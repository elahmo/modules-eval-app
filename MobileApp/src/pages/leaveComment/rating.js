var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
var RatingComponent = (function () {
    function RatingComponent() {
        this.score = 1;
        this.max = 5;
        this.iconEmpty = 'star-outline';
        this.iconHalf = 'star-half';
        this.iconFull = 'star';
    }
    RatingComponent.prototype.icons = function () {
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
    return RatingComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], RatingComponent.prototype, "score", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], RatingComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RatingComponent.prototype, "iconEmpty", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RatingComponent.prototype, "iconHalf", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], RatingComponent.prototype, "iconFull", void 0);
RatingComponent = __decorate([
    Component({
        selector: 'rating',
        //directives: [Icon],
        template: "\n\t\t<ul>\n\t\t\t<li *ngFor=\"let icon of icons()\">\n\t\t\t\t<ion-icon [name]=\"icon\"></ion-icon>\n\t\t\t</li>\n\t\t</ul>\n\t",
        styles: ["\n\t\tul {\n\t\t\tdisplay: inline-block;\n\t\t\tlist-style: none;\n\t\t\tpadding: 0;\n\t\t\tmargin: 0;\n\t\t}\n\t\tli {\n\t\t\tdisplay: inline-block;\n\t\t\tcolor: #ffa500;\n\t\t\tfont-size:2em;\n\t\t}\n\t\tli + li {\n\t\t\tmargin-left: .1em;\n\t\t}\n\t"],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], RatingComponent);
export { RatingComponent };
//# sourceMappingURL=rating.js.map