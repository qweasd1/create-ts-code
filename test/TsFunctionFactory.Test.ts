import {TsFunctionDeclarationFactory} from "../src/model/TsFunctionDeclarationFactory";
import {TsObjectFactory} from "../src/model/TsObjectFactory";
import {EOL} from "os";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test TsFunctionDeclarationFactory empty', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`function test() { }`)
});

it('test TsFunctionDeclarationFactory arrow', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("","arrow")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`() => { }`)
});


it('test TsFunctionDeclarationFactory ref', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test","get")


  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`get test() { }`)
});

it('test TsFunctionDeclarationFactory set', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test","set")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`set test() { }`)
});

it('test TsFunctionDeclarationFactory method', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test","method")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test() { }`)
});

it('test TsFunctionDeclarationFactory args', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test")
    .args("name:string", "age:number")
    .if(false).args("somethingNoAppear").endif()

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`function test(name:string, age:number) { }`)
});




it('test TsFunctionDeclarationFactory body', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test","method")
  tsFunctionFactory.args("name:string", "age:number")
  tsFunctionFactory.body("return 1")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(name:string, age:number) { return 1; }`)
});

it('test TsFunctionDeclarationFactory args multiline', function () {
  const tsFunctionFactory = new TsFunctionDeclarationFactory("test","method")
  tsFunctionFactory.argsMultiline()
  tsFunctionFactory.args("name:string", "age:number")
  tsFunctionFactory.body("return t")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(
  name:string, 
  age:number
) { return t; }`)
});

// it('test TsFunctionDeclarationFactory body multiline', function () {
//   const tsFunctionFactory = new TsFunctionDeclarationFactory()
//   tsFunctionFactory.name_("test")
//   tsFunctionFactory.setType("method")
//   tsFunctionFactory.multiline()
//   tsFunctionFactory.args("name_:string", "age:number")
//   tsFunctionFactory.body("let t = 1", "return t")
//
//   expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(name:string, age:number) {
//   let t = 1;
//   return t;
// }`)
// });






