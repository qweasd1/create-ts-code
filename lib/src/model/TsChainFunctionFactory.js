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
const TsConcatFactory_1 = require("./TsConcatFactory");
const TsArrayFactory_1 = require("./TsArrayFactory");
class TsChainFunctionFactory extends TsNodeFactory_1.TsMultilineNodeFactory {
    constructor() {
        super(...arguments);
        this.segements = [];
        // if(condition: boolean) {
        //   this.isConditionTrue = condition
        //   return this
        // }
        //
        // else() {
        //   this.isConditionTrue = !this.isConditionTrue
        //   return this
        // }
        //
        // endif() {
        //   this.isConditionTrue = true
        //   return this
        // }
        //
        // @If
        // multiline(){
        //   this.isMultiline = true
        //   return this
        // }
        //
        // @If
        // singleline(){
        //   this.isMultiline = false
        //   return this
        // }
        //
        //
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
    invoke(path, ...args) {
        this.segements.push([path, args]);
        return this;
    }
    ref(path) {
        this.segements.push(path);
        return this;
    }
    _createCodeLines(config) {
        const concat = new TsConcatFactory_1.TsConcatFactory();
        this.segements.forEach((segement, index) => {
            if (index > 0) {
                if (this.isMultiline) {
                    concat.concat(config.EOL, config.indent, ".");
                }
                else {
                    concat.concat(".");
                }
            }
            if (typeof segement === "string") {
                concat.concat(segement);
            }
            else {
                concat.concat(segement[0]);
                concat.concat(new TsArrayFactory_1.TsArrayFactory(segement[1], "arguments"));
            }
        });
        return concat.createCodeLines(config);
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TsChainFunctionFactory.prototype, "invoke", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsChainFunctionFactory.prototype, "ref", null);
exports.TsChainFunctionFactory = TsChainFunctionFactory;
//# sourceMappingURL=TsChainFunctionFactory.js.map