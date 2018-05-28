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
class TsArrayFactory extends TsNodeFactory_1.TsMultilineNodeFactory {
    constructor(arrayLiteral = [], mode = "array") {
        super();
        this.arrayLiteral = arrayLiteral;
        this.leftBracket = "[";
        this.rightBracket = "]";
        // this mode is used to generate function calling or function declaration
        if (mode === "arguments") {
            this.leftBracket = "(";
            this.rightBracket = ")";
        }
    }
    createCodeLines(config) {
        if (this.isMultiline) {
            const result = [this.leftBracket];
            this.arrayLiteral.forEach((x, index) => {
                util_1.tsNodeToLines(x, config).forEach((line) => {
                    result.push(line);
                });
                if (index < this.arrayLiteral.length - 1) {
                    result[result.length - 1] += ", ";
                }
            });
            for (let i = 1; i < result.length; i++) {
                result[i] = config.indent + result[i];
            }
            result.push(this.rightBracket);
            return result;
        }
        else {
            const result = [];
            let line = "";
            this.arrayLiteral.forEach(x => {
                const lines = util_1.tsNodeToLines(x, config);
                line += (line ? ", " : "") + lines[0];
                for (let i = 1; i < lines.length; i++) {
                    result.push(line);
                    line = lines[i];
                }
            });
            result.push(line);
            result[0] = this.leftBracket + result[0];
            result[result.length - 1] = result[result.length - 1] + this.rightBracket;
            // for(let i=1;i < result.length-1;i++){
            //   result[i] = config.indent + result[i]
            // }
            return result;
        }
    }
    add(...tsNodes) {
        this.arrayLiteral.push(...tsNodes);
        return this;
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsArrayFactory.prototype, "add", null);
exports.TsArrayFactory = TsArrayFactory;
//# sourceMappingURL=TsArrayFactory.js.map