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
const TsArrayFactory_1 = require("./TsArrayFactory");
const util_1 = require("./util");
class TsFunctionFactory extends TsNodeFactory_1.TsMultilineNodeFactory {
    constructor(name = "", type = "function") {
        super();
        this.name = name;
        this.type = type;
        this._args = [];
        this._body = [];
        this.isIgnoreBody = false;
        this.isArgsMultiline = false;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setArgsMultiline() {
        this.isArgsMultiline = true;
        return this;
    }
    addArgs(...args) {
        this._args.push(...args);
        return this;
    }
    addBody(...args) {
        this._body.push(...args);
        return this;
    }
    ignoreBody() {
        this.isIgnoreBody = true;
        return this;
    }
    addReturnType(returnType) {
        this.returnType = returnType;
        return this;
    }
    createCodeLines(config) {
        let result;
        let bodyLines = util_1.tsNodesToLines(this._body, config).map((line) => {
            if (line.endsWith(";")) {
                return line;
            }
            else {
                return line + ";";
            }
        });
        const argumentFactory = new TsArrayFactory_1.TsArrayFactory(this._args, "arguments");
        argumentFactory.isMultiline = this.isArgsMultiline;
        let argLines = argumentFactory.createCodeLines(config);
        let signaturePrefix = "";
        let signatureSuffix = "";
        const returnType = this.returnType ? ` : ${this.returnType}` : "";
        switch (this.type) {
            case "arrow":
                signaturePrefix = "";
                signatureSuffix = " => {";
                break;
            case "function":
                signaturePrefix = `function ${this.name}`;
                signatureSuffix = " {";
                break;
            case "get":
                signaturePrefix = `get ${this.name}`;
                signatureSuffix = " {";
                break;
            case "set":
                signaturePrefix = `set ${this.name}`;
                signatureSuffix = " {";
                break;
            case "method":
                signaturePrefix = `${this.name}`;
                signatureSuffix = " {";
                break;
        }
        result = argLines;
        result[0] = signaturePrefix + result[0];
        result[result.length - 1] = result[result.length - 1] + returnType;
        if (this.isIgnoreBody) {
            return result;
        }
        result[result.length - 1] = result[result.length - 1] + signatureSuffix;
        // this is for body multiline
        if (this.isMultiline) {
            result[result.length - 1] += " ";
            if (bodyLines.length === 0) {
                bodyLines.push("");
            }
            bodyLines.map(x => config.indent + x + " ").forEach((line) => {
                result.push(line);
            });
            result.push("}");
        }
        else {
            const bodyLine = bodyLines.join(" ");
            result[result.length - 1] += ((bodyLine ? " " + bodyLine : "") + " }");
        }
        return result;
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "setName", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "setType", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "setArgsMultiline", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "addArgs", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "addBody", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "ignoreBody", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsFunctionFactory.prototype, "addReturnType", null);
exports.TsFunctionFactory = TsFunctionFactory;
//# sourceMappingURL=TsFunctionFactory.js.map