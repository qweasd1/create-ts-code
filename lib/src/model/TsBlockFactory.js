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
const TsNodeFactory_1 = require("./TsNodeFactory");
const util_1 = require("./util");
class TsBlockFactory extends TsNodeFactory_1.TsBodyNodeFactory {
    constructor() {
        super(...arguments);
        this.tsNodes = [];
        // emitWhen(condition: boolean) {
        //   this.isEmit = condition
        //   return this
        // }
        //
        // loads(plugin: (self) => void){
        //   plugin(this)
        //   return this
        // }
    }
    append(...tsNodes) {
        this.tsNodes.push(...tsNodes);
        return this;
    }
    push(...tsNodes) {
        this.tsNodes.push(...tsNodes);
    }
    remove(tsNode) {
        this.tsNodes.splice(this.tsNodes.indexOf(tsNode), 1);
    }
    _createCodeLines(config) {
        return this.tsNodes.reduce((acc, current) => {
            acc.push(...util_1.tsNodeToLines(current, config));
            return acc;
        }, []);
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsBlockFactory.prototype, "append", null);
exports.TsBlockFactory = TsBlockFactory;
//# sourceMappingURL=TsBlockFactory.js.map