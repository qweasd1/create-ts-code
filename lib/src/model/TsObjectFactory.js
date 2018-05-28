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
class TsObjectFactory extends TsNodeFactory_1.TsMultilineNodeFactory {
    constructor(objectLiteral = {}) {
        super();
        this.objectLiteral = objectLiteral;
    }
    createCodeLines(config) {
        if (this.isMultiline) {
            const result = ["{"];
            const keys = Object.keys(this.objectLiteral);
            keys.forEach((key, index) => {
                util_1.tsNodeToLines(this.objectLiteral[key], config).forEach((line, i) => {
                    if (i === 0) {
                        result.push(key + ":" + line);
                    }
                    else {
                        result.push(line);
                    }
                });
                if (index < keys.length - 1) {
                    result[result.length - 1] += ", ";
                }
            });
            for (let i = 1; i < result.length; i++) {
                result[i] = config.indent + result[i];
            }
            result.push("}");
            return result;
        }
        else {
            const result = [];
            let line = "";
            Object.keys(this.objectLiteral).forEach(key => {
                const values = util_1.tsNodeToLines(this.objectLiteral[key], config);
                line += (line ? ", " : "") + key + ":" + values[0];
                for (let i = 1; i < values.length; i++) {
                    result.push(line);
                    line = values[i];
                }
            });
            result.push(line);
            result[0] = "{" + result[0];
            result[result.length - 1] = result[result.length - 1] + "}";
            return result;
        }
    }
    set(key, value) {
        this.objectLiteral[key] = value;
        return this;
    }
    has(key) {
        return key in this.objectLiteral;
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TsObjectFactory.prototype, "set", null);
exports.TsObjectFactory = TsObjectFactory;
//# sourceMappingURL=TsObjectFactory.js.map