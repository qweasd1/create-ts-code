"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsConcatFactory_1 = require("../src/model/TsConcatFactory");
const os_1 = require("os");
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
it('test TsConcatFactory with let', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .let("t").type("number").equals("1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`let t: number = 1`);
});
it('test TsConcatFactory with let literal', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .let("t = 1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`let t = 1`);
});
it('test TsConcatFactory with const', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .const("t").type("number").equals("1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`const t: number = 1`);
});
it('test TsConcatFactory with const literal', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .const("t = 1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`const t = 1`);
});
it('test TsConcatFactory with field', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .field("t").type("number").equals("1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`t: number = 1`);
});
it('test TsConcatFactory export', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory()
        .export.const("t").equals("1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`export const t = 1`);
});
it('test TsConcatFactory export default', function () {
    const tsConcatFactory = new TsConcatFactory_1.TsConcatFactory();
    tsConcatFactory.export.default.field("some");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`export default some`);
});
//# sourceMappingURL=TsConcatFactory.Test.js.map