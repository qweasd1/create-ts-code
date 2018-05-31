"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsEntityFactory_1 = require("../src/model/TsEntityFactory");
const os_1 = require("os");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test TsInterfaceFactory with nothing', function () {
    const interface_ = new TsEntityFactory_1.TsInterfaceFactory("Person");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
}`);
});
it('test TsInterfaceFactory with implements', function () {
    const interface_ = new TsEntityFactory_1.TsInterfaceFactory("Person")
        .implements("A", "B", "C")
        .if(false)
        .implements("D")
        .else()
        .implements("E")
        .endif();
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person implements A, B, C, E {
}`);
});
it('test TsInterfaceFactory with export', function () {
    const interface_ = new TsEntityFactory_1.TsInterfaceFactory("Person")
        .export();
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`export interface Person {
}`);
});
it('test TsInterfaceFactory with field literal', function () {
    const interface_ = new TsEntityFactory_1.TsInterfaceFactory("Person")
        .addLiteral("name_:string")
        .addLiteral("other:number");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
  name:string
  other:number
}`);
});
it('test TsInterfaceFactory with field map', function () {
    const interface_ = new TsEntityFactory_1.TsInterfaceFactory("Person")
        .add("name", "name_:string")
        .add("name", "name_:number");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
  name:string
}`);
});
// it('test TsImportFactory with if', function () {
//   const tsImportFactory = new TsInterfaceFactory()
//   tsImportFactory.if(false)
//     .addLiteral("import * as path from 'path'")
//   .else()
//     .addLiteral("import * as fs from 'fs'")
//   .endif()
//
//   tsImportFactory.push("a", "b")
//   tsImportFactory.push("a", ["b", "c"])
//
//   expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { b, c } from 'a';
// import * as fs from 'fs';`)
//
// }); 
//# sourceMappingURL=TsInterfaceFactory.Test.js.map