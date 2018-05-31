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
const TsEntityFactory_1 = require("./TsEntityFactory");
class TsFunctionDeclarationFactory extends TsNodeFactory_1.TsBodyNodeFactory {
    constructor(name_ = "", type = "function") {
        super();
        this.name_ = name_;
        this.type = type;
        this._args = [];
        this._body = [];
        this.isIgnoreBody = false;
        this.isArgsMultiline = false;
    }
    get context() {
        return this._context;
    }
    set context(value) {
        this._context = value;
        // if inside interface, ignore body
        if (this.context.currentBodyFactory) {
            if ((this.context.currentBodyFactory instanceof TsEntityFactory_1.TsEntityFactory) && this.context.currentBodyFactory.entityType === "interface") {
                this.isIgnoreBody = true;
            }
        }
    }
    // @If
    // name(name:string){
    //   this.name_ = name
    //   return this
    // }
    argsMultiline() {
        this.isArgsMultiline = true;
        return this;
    }
    argsSingleline() {
        this.isArgsMultiline = false;
        return this;
    }
    args(...args) {
        this._args.push(...args);
        return this;
    }
    body(tsNode) {
        if (typeof tsNode === "function") {
            this.context.push(this);
            tsNode();
            this.context.pop();
        }
        else {
            this._body.push(tsNode);
        }
        return this;
    }
    push(...tsNodes) {
        this._body.push(...tsNodes);
    }
    remove(tsNode) {
        this._body.splice(this._body.indexOf(tsNode), 1);
    }
    returns(returnType) {
        this.returnType = returnType;
        return this;
    }
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
    // emitWhen(condition: boolean) {
    //   this.isEmit = condition
    //   return this
    // }
    //
    // loads(plugin: (self) => void){
    //   plugin(this)
    //   return this
    // }
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
    _createCodeLines(config) {
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
                signaturePrefix = `function ${this.name_}`;
                signatureSuffix = " {";
                break;
            case "get":
                signaturePrefix = `get ${this.name_}`;
                signatureSuffix = " {";
                break;
            case "set":
                signaturePrefix = `set ${this.name_}`;
                signatureSuffix = " {";
                break;
            case "method":
                signaturePrefix = `${this.name_}`;
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
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsFunctionDeclarationFactory.prototype, "argsMultiline", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsFunctionDeclarationFactory.prototype, "argsSingleline", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsFunctionDeclarationFactory.prototype, "args", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsFunctionDeclarationFactory.prototype, "body", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsFunctionDeclarationFactory.prototype, "returns", null);
exports.TsFunctionDeclarationFactory = TsFunctionDeclarationFactory;
//# sourceMappingURL=TsFunctionDeclarationFactory.js.map