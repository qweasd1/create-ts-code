import {TsImportFactory} from "../src/model/TsImportFactory";
import {EOL} from "os";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test items', function () {
  const tsImportFactory = new TsImportFactory("path").imports("join","dirname") as TsImportFactory

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { join, dirname } from 'path'`)
});

it('test no items should not output', function () {
  const tsImportFactory = new TsImportFactory("path").if(false).imports("join","dirname") as TsImportFactory

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(``)
});


it('test items with condition', function () {
  const tsImportFactory = new TsImportFactory("m")
    .if(true).imports("a")
    .if(false).imports("b") as TsImportFactory

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { a } from 'm'`)
});


it('test import module', function () {
  const tsImportFactory = new TsImportFactory("path").importModule() as TsImportFactory

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import * as path from 'path'`)
});

it('test import module alias', function () {
  const tsImportFactory = new TsImportFactory("path").importModuleAs("ps") as TsImportFactory

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import * as ps from 'path'`)
});


