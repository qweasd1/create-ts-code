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
class TsEntityFactory extends TsNodeFactory_1.TsBodyNodeFactory {
    constructor(name, entityType) {
        super();
        this.name = name;
        this.entityType = entityType;
        this._body = [];
        this._implements = new Set();
        this._extends = new Set();
    }
    push(...tsNodes) {
        this._body.push(...tsNodes);
    }
    remove(tsNode) {
        this._body.splice(this._body.indexOf(tsNode), 1);
    }
    implements(...implementInterfaces) {
        implementInterfaces.forEach(x => this._implements.add(x));
        return this;
    }
    extends(...baseClasses) {
        baseClasses.forEach(x => this._extends.add(x));
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
    _createCodeLines(config) {
        let lines = [];
        lines.push(`${this.buildEntityDeclaration(this.entityType)}${this.buildExtends()}${this.buildImplements()} {`);
        let body = util_1.tsNodesToLines(this._body, config).map(x => config.indent + x);
        if (this.entityType === "enum") {
            for (let i = 0; i < body.length - 1; i++) {
                body[i] = body[i] + ",";
            }
        }
        lines = lines.concat(body);
        lines.push("}");
        return lines;
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
    buildEntityDeclaration(entityType) {
        return `${entityType} ${this.name}`;
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
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "implements", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TsEntityFactory.prototype, "extends", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TsEntityFactory.prototype, "body", null);
exports.TsEntityFactory = TsEntityFactory;
//# sourceMappingURL=TsEntityFactory.js.map