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
/**
 * Entity could be class, interface, enum
 */
class TsEntityFactory extends TsNodeFactory_1.TsNodeFactory {
    // private _decoratorMap = new Map<string,TsNode>()
    constructor(name, entityType, isExport = false) {
        super();
        this.name = name;
        this.entityType = entityType;
        this.isExport = isExport;
        this._fieldMap = new Map();
        this._literalFields = [];
        this._implements = new Set();
        this._extends = new Set();
        this._literalDecorators = [];
    }
    addLiterals(...fieldLiteral) {
        this._literalFields.push(...fieldLiteral);
        return this;
    }
    add(name, field) {
        if (!this._fieldMap.has(name)) {
            this._fieldMap.set(name, field);
        }
        return this;
    }
    addDecoratorLiterals(...callExpr) {
        this._literalDecorators.push(...callExpr);
        return this;
    }
    implements(...implementInterfaces) {
        implementInterfaces.forEach(x => this._implements.add(x));
        return this;
    }
    exntends(...exntends) {
        exntends.forEach(x => this._extends.add(x));
        return this;
    }
    export() {
        this.isExport = true;
        return this;
    }
    emptyLine() {
        this._literalFields.push(util_1.EMPTY_LINE);
        return this;
    }
    createCodeLines(config) {
        let lines = [];
        lines = lines.concat(this.buildEntityDecoratorLine(config));
        lines.push(`${this.buildEntityDeclaration(this.entityType)}${this.buildExtends()}${this.buildImplements()} {`);
        let body = util_1.tsNodesToLines(this._literalFields, config).map(x => config.indent + x)
            .concat(util_1.tsNodesToLines(util_1.toArray(this._fieldMap), config).map(x => config.indent + x));
        if (this.entityType === "enum") {
            for (let i = 0; i < body.length - 1; i++) {
                body[i] = body[i] + ",";
            }
        }
        lines = lines.concat(body);
        lines.push("}");
        return lines;
    }
    buildEntityDecoratorLine(config) {
        console.log(this._literalDecorators);
        return util_1.tsNodesToLines(this._literalDecorators, config).map(x => x);
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
    buildExtends() {
        if (this._extends.size > 0) {
            return ` extends ${Array.from(this._extends).join(", ")}`;
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
], TsEntityFactory.prototype, "addLiterals", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "add", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "addDecoratorLiterals", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "implements", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "exntends", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "export", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "emptyLine", null);
exports.TsEntityFactory = TsEntityFactory;
//# sourceMappingURL=TsEntityFactory.js.map