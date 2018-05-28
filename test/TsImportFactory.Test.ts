import {TsImportFacotry} from "../src/model/TsImportFactory";
import {EOL} from "os";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test TsImportFactory', function () {
  const tsImportFactory = new TsImportFacotry()
  tsImportFactory.addLiteral("import * as path from 'path'")
  tsImportFactory.add("a", "b")
  tsImportFactory.add("a", ["b", "c"])

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { b, c } from 'a';
import * as path from 'path';`)
});

it('test TsImportFactory with if', function () {
  const tsImportFactory = new TsImportFacotry()
  tsImportFactory.if(false)
    .addLiteral("import * as path from 'path'")
  .else()
    .addLiteral("import * as fs from 'fs'")
  .endIf()

  tsImportFactory.add("a", "b")
  tsImportFactory.add("a", ["b", "c"])

  expect(tsImportFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`import { b, c } from 'a';
import * as fs from 'fs';`)

});