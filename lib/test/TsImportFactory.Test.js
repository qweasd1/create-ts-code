"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsImportFactory_1 = require("../src/model/TsImportFactory");
const os_1 = require("os");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test items', function () {
    const tsImportFactory = new TsImportFactory_1.TsImportFactory("path").imports("join", "dirname");
    expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { join, dirname } from 'path'`);
});
it('test no items should not output', function () {
    const tsImportFactory = new TsImportFactory_1.TsImportFactory("path").if(false).imports("join", "dirname");
    expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(``);
});
it('test items with condition', function () {
    const tsImportFactory = new TsImportFactory_1.TsImportFactory("m")
        .if(true).imports("a")
        .if(false).imports("b");
    expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { a } from 'm'`);
});
it('test import module', function () {
    const tsImportFactory = new TsImportFactory_1.TsImportFactory("path").importModule();
    expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import * as path from 'path'`);
});
it('test import module alias', function () {
    const tsImportFactory = new TsImportFactory_1.TsImportFactory("path").importModuleAs("ps");
    expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import * as ps from 'path'`);
});
//# sourceMappingURL=TsImportFactory.Test.js.map