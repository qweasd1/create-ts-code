"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const TsChainFunctionFactory_1 = require("../src/model/TsChainFunctionFactory");
const TsObjectFactory_1 = require("../src/model/TsObjectFactory");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('access single path', function () {
    const tsConcatFactory = new TsChainFunctionFactory_1.TsChainFunctionFactory()
        .ref("test.a.1");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test.a.1`);
});
it('access multi path', function () {
    const tsConcatFactory = new TsChainFunctionFactory_1.TsChainFunctionFactory()
        .ref("test.a").ref("some['other']");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test.a.some['other']`);
});
it('call single function', function () {
    const tsConcatFactory = new TsChainFunctionFactory_1.TsChainFunctionFactory()
        .invoke("test", "1", { a: "1" });
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(1, {a:1})`);
});
it('call chained function', function () {
    const tsConcatFactory = new TsChainFunctionFactory_1.TsChainFunctionFactory()
        .invoke("test", "1", new TsObjectFactory_1.TsObjectFactory({ a: "1" }).multiline()).invoke("other", "1", "2");
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(1, {
  a:1
}).other(1, 2)`);
});
it('call chained function multiline', function () {
    const tsConcatFactory = new TsChainFunctionFactory_1.TsChainFunctionFactory()
        .invoke("test", "1").invoke("other", "1", "2").invoke("another", "'k'").ref("some[0]").multiline();
    expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(1)
  .other(1, 2)
  .another('k')
  .some[0]`);
});
//# sourceMappingURL=TsChainFunctionFactory.Test.js.map