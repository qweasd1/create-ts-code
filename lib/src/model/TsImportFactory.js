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
class TsImportFactory extends TsNodeFactory_1.TsNodeFactory {
    constructor(from) {
        super();
        // if(condition: boolean):TsImport {
        //   this.isConditionTrue = condition
        //   return this
        // }
        //
        // endif() {
        //   this.isConditionTrue = true
        //   return this
        // }
        //
        // else() : TsImport {
        //   this.isConditionTrue = !this.isConditionTrue
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
        this.items = [];
        this.mode = "items";
        this.alias = null;
        this.from = from;
    }
    imports(...items) {
        this.items.push(...items);
        return this;
    }
    importModule() {
        this.mode = "module";
        return this;
    }
    importModuleAs(alias) {
        this.mode = "alias";
        this.alias = alias;
        return this;
    }
    _createCodeLines(config) {
        switch (this.mode) {
            case "items":
                if (this.items.length > 0) {
                    return [`import { ${this.items.join(", ")} } from '${this.from}'`];
                }
                else {
                    return [];
                }
            case "alias":
                return [`import * as ${this.alias} from '${this.from}'`];
            case "module":
                return [`import * as ${this.from} from '${this.from}'`];
        }
    }
}
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TsImportFactory.prototype, "imports", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], TsImportFactory.prototype, "importModule", null);
__decorate([
    TsNodeFactory_1.If,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TsImportFactory.prototype, "importModuleAs", null);
exports.TsImportFactory = TsImportFactory;
//# sourceMappingURL=TsImportFactory.js.map