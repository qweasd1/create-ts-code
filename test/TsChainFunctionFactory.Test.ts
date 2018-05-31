import {EOL} from "os";
import {TsChainFunctionFactory} from "../src/model/TsChainFunctionFactory";
import {TsObjectFactory} from "../src/model/TsObjectFactory";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('access single path', function () {
  const tsConcatFactory = new TsChainFunctionFactory()
    .ref("test.a.1")
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test.a.1`)
});

it('access multi path', function () {
  const tsConcatFactory = new TsChainFunctionFactory()
    .ref("test.a").ref("some['other']")
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test.a.some['other']`)
});

it('call single function', function () {
  const tsConcatFactory = new TsChainFunctionFactory()
    .invoke("test","1", {a:"1"})
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(1, {a:1})`)
});

it('call chained function', function () {
  const tsConcatFactory = new TsChainFunctionFactory()
    .invoke("test","1", new TsObjectFactory({a:"1"}).multiline()).invoke("other","1","2")
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(1, {
  a:1
}).other(1, 2)`)
});

it('call chained function multiline', function () {
  const tsConcatFactory = new TsChainFunctionFactory()
    .invoke("test","1").invoke("other","1","2").invoke("another","'k'").ref("some[0]").multiline()
  expect(tsConcatFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(1)
  .other(1, 2)
  .another('k')
  .some[0]`)
});



