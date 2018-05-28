import {TsConcatFactory} from "../src/model/TsConcatFactory";
import {EOL} from "os";
import {TsFunctionFactory} from "../src/model/TsFunctionFactory";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test TsConcatFactory assign', function () {
  const tsConcatFactory = new TsConcatFactory()
    .concat("let t = ")
    .concat("1")
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`let t = 1`)
});

it('test TsConcatFactory assign object', function () {
  const tsConcatFactory = new TsConcatFactory()
    .concat("let t = ")
    .concat({a:"1"})
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`let t = {a:1}`)
});

it('test TsConcatFactory add prefix', function () {
  const tsConcatFactory = new TsConcatFactory()
    .concat("abstract ")
    .concat(new TsFunctionFactory().setName("some").setType("method").addArgs("name:string","age:number").addReturnType("string").ignoreBody())
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`abstract some(name:string, age:number) : string`)
});


