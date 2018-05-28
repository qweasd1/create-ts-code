"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
class TsNodeFactory {
    constructor() {
        this.isConditionTrue = true;
    }
    createCode(config) {
        return this.createCodeLines(config).join(config.EOL);
    }
    if(condition) {
        this.isConditionTrue = condition;
        return this;
    }
    endIf() {
        this.isConditionTrue = true;
        return this;
    }
    else() {
        this.isConditionTrue = !this.isConditionTrue;
        return this;
    }
}
exports.TsNodeFactory = TsNodeFactory;
class TsMultilineNodeFactory extends TsNodeFactory {
    constructor() {
        super(...arguments);
        this.isMultiline = false;
    }
    multiline() {
        this.isMultiline = true;
        return this;
    }
    singleline() {
        this.isMultiline = false;
        return this;
    }
}
__decorate([
    If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsMultilineNodeFactory.prototype, "multiline", null);
__decorate([
    If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsMultilineNodeFactory.prototype, "singleline", null);
exports.TsMultilineNodeFactory = TsMultilineNodeFactory;
/**
 * Annotation to let TsNodeFactory can generate content according to condition
 * @param target
 * @param {string} propertyKey
 * @param {PropertyDescriptor} descriptor
 * @constructor
 */
function If(target, propertyKey, descriptor) {
    const originMethod = descriptor.value;
    descriptor.value = function (...args) {
        if (this.isConditionTrue) {
            originMethod.apply(this, args);
        }
        return this;
    };
}
exports.If = If;
;
//# sourceMappingURL=TsNodeFactory.js.map