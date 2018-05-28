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
class TsInterfaceFactory extends TsNodeFactory_1.TsNodeFactory {
    constructor(name, isExport = false) {
        super();
        this.name = name;
        this.isExport = isExport;
        this._fieldMap = new Map();
        this._literalFields = [];
        this._implements = new Set();
    }
    addLiteral(fieldLiteral) {
        this._literalFields.push(fieldLiteral);
        return this;
    }
    add(fieldName, field) {
        if (!this._fieldMap.has(fieldName)) {
            this._fieldMap.set(fieldName, field);
        }
        return this;
    }
    implements(...implementInterfaces) {
        implementInterfaces.forEach(x => this._implements.add(x));
        return this;
    }
    export() {
        this.isExport = true;
        return this;
    }
    createCodeLines(config) {
        let lines = [];
        lines.push(`${this.buildEntityDeclaration("interface")}${this.buildImplements()} {`);
        lines = lines.concat(this.tsNodeToLines(this._literalFields, config).map(x => config.indent + x));
        lines = lines.concat(this.tsNodeToLines(util_1.toArray(this._fieldMap), config).map(x => config.indent + x));
        lines.push("}");
        return lines;
    }
    buildEntityDeclaration(entityType) {
        return `${this.isExport ? "export " : ""}${entityType} ${this.name}`;
    }
    buildImplements() {
        if (this._implements.size > 0) {
            return ` implements ${Array.from(this._implements).join(", ")}`;
        }
        else {
            return "";
        }
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsInterfaceFactory.prototype, "addLiteral", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TsInterfaceFactory.prototype, "add", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsInterfaceFactory.prototype, "implements", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsInterfaceFactory.prototype, "export", null);
exports.TsInterfaceFactory = TsInterfaceFactory;
//# sourceMappingURL=TsInterfaceFactory.js.map