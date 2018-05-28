import {TsArrayFactory} from "../src/model/TsArrayFactory";
import {EOL} from "os";
import {TsObjectFactory} from "../src/model/TsObjectFactory";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test TsArrayFactory with single line', function () {
  const tsArrayFactory = new TsArrayFactory()

  tsArrayFactory.add("a", "b","123","[1,2,3]")

  expect(tsArrayFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`[a, b, 123, [1,2,3]]`)
});

it('test TsArrayFactory with single line but contains multiline element', function () {
  const tsArrayFactory = new TsArrayFactory()

  tsArrayFactory.add("a", "b","123",new TsObjectFactory({a:"1"}).multiline())

  expect(tsArrayFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`[a, b, 123, {
  a:1
}]`)
});

it('test TsArrayFactory with multiline', function () {
  const tsArrayFactory = new TsArrayFactory()

  tsArrayFactory.add("a", "b","123","[1,2,3]").multiline()

  expect(tsArrayFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`[
  a, 
  b, 
  123, 
  [1,2,3]
]`)
});


