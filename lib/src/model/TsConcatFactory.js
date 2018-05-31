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
const TsEntityFactory_1 = require("./TsEntityFactory");
class TsConcatFactory extends TsNodeFactory_1.TsNodeFactory {
    constructor() {
        super();
        this.tsNodes = [];
    }
    concat(...tsNodes) {
        this.tsNodes.push(...tsNodes);
        return this;
    }
    _createCodeLines(config) {
        return this.tsNodes.reduce((acc, current) => {
            if (acc.length === 0) {
                acc.push(...util_1.tsNodeToLines(current, config));
            }
            else {
                const nextLines = util_1.tsNodeToLines(current, config);
                acc[acc.length - 1] += nextLines[0];
                acc.push(...nextLines.slice(1));
            }
            return acc;
        }, []);
    }
    get static() {
        this.tsNodes.push("static ");
        return this;
    }
    get abstract() {
        this.tsNodes.push("abstract ");
        return this;
    }
    get default() {
        this.tsNodes.push("default ");
        return this;
    }
    get public() {
        this.tsNodes.push("public ");
        return this;
    }
    get protected() {
        this.tsNodes.push("protected ");
        return this;
    }
    get private() {
        this.tsNodes.push("private ");
        return this;
    }
    get export() {
        this.tsNodes.push("export ");
        return this;
    }
    type(type) {
        this.tsNodes.push(": ", type);
        return this;
    }
    equals(tsNode) {
        this.tsNodes.push(" = ", tsNode);
        return this;
    }
    interface(name) {
        const interface_ = new TsEntityFactory_1.TsEntityFactory(name, "interface");
        interface_.context = this.context;
        this.tsNodes.push(interface_);
        return interface_;
    }
    enum(name) {
        const enum_ = new TsEntityFactory_1.TsEntityFactory(name, "enum");
        enum_.context = this.context;
        this.tsNodes.push(enum_);
        return enum_;
    }
    class(name) {
        const class_ = new TsEntityFactory_1.TsEntityFactory(name, "class");
        class_.context = this.context;
        this.tsNodes.push(class_);
        return class_;
    }
    function(name) {
        return undefined;
    }
    field(name) {
        this.tsNodes.push(name);
        return this;
    }
    method(name) {
        return undefined;
    }
    const(name) {
        this.tsNodes.push("const ", name);
        return this;
    }
    let(name) {
        this.tsNodes.push("let ", name);
        return this;
    }
    // if(condition: boolean): TsDeclaration {
    //   this.isConditionTrue = condition
    //   return this
    // }
    //
    // else(): TsDeclaration {
    //   this.isConditionTrue = !this.isConditionTrue
    //   return this
    // }
    //
    // endif(): TsDeclaration {
    //   this.isConditionTrue = true
    //   return this
    // }
    emitWhen(condition) {
        this.isEmit = condition;
        return this;
    }
    loads(plugin) {
        plugin(this);
        return this;
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsConcatFactory.prototype, "concat", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TsConcatFactory.prototype, "type", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TsConcatFactory.prototype, "equals", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TsConcatFactory.prototype, "field", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TsConcatFactory.prototype, "method", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TsConcatFactory.prototype, "const", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TsConcatFactory.prototype, "let", null);
exports.TsConcatFactory = TsConcatFactory;
//# sourceMappingURL=TsConcatFactory.js.map