"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsArrayFactory_1 = require("../src/model/TsArrayFactory");
const os_1 = require("os");
const TsObjectFactory_1 = require("../src/model/TsObjectFactory");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test TsArrayFactory with single line', function () {
    const tsArrayFactory = new TsArrayFactory_1.TsArrayFactory();
    tsArrayFactory.push("a", "b", "123", "[1,2,3]");
    expect(tsArrayFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`[a, b, 123, [1,2,3]]`);
});
it('test TsArrayFactory with single line but contains multiline element', function () {
    const tsArrayFactory = new TsArrayFactory_1.TsArrayFactory();
    tsArrayFactory.push("a", "b", "123", new TsObjectFactory_1.TsObjectFactory({ a: "1" }).multiline());
    expect(tsArrayFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`[a, b, 123, {
  a:1
}]`);
});
it('test TsArrayFactory with multiline', function () {
    const tsArrayFactory = new TsArrayFactory_1.TsArrayFactory();
    tsArrayFactory.push("a", "b", "123", "[1,2,3]").multiline();
    expect(tsArrayFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`[
  a, 
  b, 
  123, 
  [1,2,3]
]`);
});
//# sourceMappingURL=TsArrayFactory.Test.js.map