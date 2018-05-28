"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsConcatFactory_1 = require("../src/model/TsConcatFactory");
const os_1 = require("os");
const TsFunctionFactory_1 = require("../src/model/TsFunctionFactory");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test TsConcatFactory assign', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .concat("let t = ")
        .concat("1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`let t = 1`);
});
it('test TsConcatFactory assign object', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .concat("let t = ")
        .concat({ a: "1" });
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`let t = {a:1}`);
});
it('test TsConcatFactory add prefix', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .concat("abstract ")
        .concat(new TsFunctionFactory_1.TsFunctionFactory().setName("some").setType("method").addArgs("name:string", "age:number").addReturnType("string").ignoreBody());
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`abstract some(name:string, age:number) : string`);
});
//# sourceMappingURL=TsConcatFactory.Test.js.map