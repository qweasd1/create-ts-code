import {TsFunctionFactory} from "../src/model/TsFunctionFactory";
import {TsObjectFactory} from "../src/model/TsObjectFactory";
import {EOL} from "os";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test TsFunctionFactory empty', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`function test() { }`)
});

it('test TsFunctionFactory arrow', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setType("arrow")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`() => { }`)
});


it('test TsFunctionFactory get', function () {
  const tsFunctionFactory = new TsFunctionFactory()
    .setName("test")
  tsFunctionFactory.setType("get")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`get test() { }`)
});

it('test TsFunctionFactory set', function () {
  const tsFunctionFactory = new TsFunctionFactory()
    .setName("test")
  tsFunctionFactory.setType("set")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`set test() { }`)
});

it('test TsFunctionFactory method', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")
  tsFunctionFactory.setType("method")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test() { }`)
});

it('test TsFunctionFactory args', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")
  tsFunctionFactory.addArgs("name:string", "age:number")
  tsFunctionFactory.if(false).addArgs("somethingNoAppear").endIf()

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`function test(name:string, age:number) { }`)
});


it('test TsFunctionFactory ignore body', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")
  tsFunctionFactory.setType("method")
  tsFunctionFactory.addArgs("name:string", "age:number")
  tsFunctionFactory.ignoreBody()

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(name:string, age:number)`)
});

it('test TsFunctionFactory return type', function () {
  const tsFunctionFactory = new TsFunctionFactory()
    .setName("test")
    .setType("method")
    .addArgs("name:string", "age:number")
    .addReturnType("string")
  tsFunctionFactory.ignoreBody()

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(name:string, age:number) : string`)
});


it('test TsFunctionFactory body', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")
  tsFunctionFactory.setType("method")
  tsFunctionFactory.addArgs("name:string", "age:number")
  tsFunctionFactory.addBody("let t = 1", "return t")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(name:string, age:number) { let t = 1; return t; }`)
});

it('test TsFunctionFactory args multiline', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")
  tsFunctionFactory.setType("method")
  tsFunctionFactory.setArgsMultiline()
  tsFunctionFactory.addArgs("name:string", "age:number")
  tsFunctionFactory.addBody("let t = 1", "return t")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(
  name:string, 
  age:number
) { let t = 1; return t; }`)
});

it('test TsFunctionFactory body multiline', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("test")
  tsFunctionFactory.setType("method")
  tsFunctionFactory.multiline()
  tsFunctionFactory.addArgs("name:string", "age:number")
  tsFunctionFactory.addBody("let t = 1", "return t")

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`test(name:string, age:number) { 
  let t = 1; 
  return t; 
}`)
});

it('test TsFunctionFactory simulate annotation', function () {
  const tsFunctionFactory = new TsFunctionFactory()
  tsFunctionFactory.setName("@Component")
  tsFunctionFactory.setType("method")
  tsFunctionFactory.addArgs(new TsObjectFactory({selector:"'some'"}).multiline())
  tsFunctionFactory.ignoreBody()

  expect(tsFunctionFactory.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`@Component({
  selector:'some'
})`)
});






