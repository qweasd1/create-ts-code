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
class TsImportFacotry extends TsNodeFactory_1.TsNodeFactory {
    constructor() {
        super(...arguments);
        this._importMap = new Map();
        this._literalImports = [];
    }
    addLiteral(importLiteral) {
        this._literalImports.push(importLiteral);
        return this;
    }
    add(from, items) {
        if (typeof items === "string") {
            items = [items];
        }
        if (!this._importMap.has(from)) {
            this._importMap.set(from, new Set());
        }
        items.forEach(x => this._importMap.get(from).add(x));
        return this;
    }
    createCodeLines(config) {
        const result = [];
        this._importMap.forEach((items, from) => {
            result.push(`import { ${Array.from(items).join(", ")} } from '${from}'`);
        });
        this._literalImports.forEach((line) => result.push(line));
        return result.map(x => x + ";");
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsImportFacotry.prototype, "addLiteral", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TsImportFacotry.prototype, "add", null);
exports.TsImportFacotry = TsImportFacotry;
//# sourceMappingURL=TsImportFactory.js.map