"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsEntityFactory_1 = require("../src/model/TsEntityFactory");
const os_1 = require("os");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test TsEntityFactory with nothing', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
}`);
});
it('test TsEntityFactory with implements', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface")
        .implements("A", "B", "C")
        .if(false)
        .implements("D")
        .else()
        .implements("E")
        .endif();
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person implements A, B, C, E {
}`);
});
it('test TsEntityFactory with extends', function () {
    const class_ = new TsEntityFactory_1.TsEntityFactory("Person", "class")
        .extends("A", "B", "C")
        .if(false)
        .implements("D")
        .else()
        .implements("E")
        .endif();
    expect(class_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`class Person extends A, B, C implements E {
}`);
});
it('test TsEntityFactory with field literal', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface");
    interface_.push("name:string");
    interface_.push("other:number");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
  name:string
  other:number
}`);
});
it('test enum with field', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Status", "enum");
    interface_.push("bad = 1");
    interface_.push("good = 0");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`enum Status {
  bad = 1,
  good = 0
}`);
});
//# sourceMappingURL=TsEntityFactory.Test.js.map