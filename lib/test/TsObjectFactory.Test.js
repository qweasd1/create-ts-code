"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const TsObjectFactory_1 = require("../src/model/TsObjectFactory");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test TsObjectFactory with single line', function () {
    const tsObjectFactory = new TsObjectFactory_1.TsObjectFactory();
    tsObjectFactory.set("a", "b").set("c", "d");
    expect(tsObjectFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`{a:b, c:d}`);
});
it('test TsObjectFactory with single line but contains multiline element', function () {
    const tsObjectFactory = new TsObjectFactory_1.TsObjectFactory();
    tsObjectFactory.set("a", "b").set("c", "d").set("d", new TsObjectFactory_1.TsObjectFactory({ a: "1" }).multiline());
    expect(tsObjectFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`{a:b, c:d, d:{
  a: 1
}}`);
});
it('test TsObjectFactory with multiline', function () {
    const tsObjectFactory = new TsObjectFactory_1.TsObjectFactory();
    tsObjectFactory.set("a", "b").set("c", "d").multiline();
    expect(tsObjectFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`{
  a: b, 
  c: d
}`);
});
//# sourceMappingURL=TsObjectFactory.Test.js.map