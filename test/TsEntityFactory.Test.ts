import {TsEntityFactory} from "../src/model/TsEntityFactory";
import {TsObjectFactory} from '../src/model/TsObjectFactory';

import {EOL} from "os";

const DEFAULT_CREATE_CODE_CONFIG = {
  indent: "  ",
  EOL: EOL
}

it('test TsEntityFactory with nothing', function () {
  const interface_ = new TsEntityFactory("Person","interface")

  expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
}`)
});

it('test TsEntityFactory with implements', function () {
  const interface_ = new TsEntityFactory("Person","interface")
    .implements("A","B","C")
    .if(false)
      .implements("D")
    .else()
      .implements("E")
    .endif()

  expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person implements A, B, C, E {
}`)
});

it('test TsEntityFactory with extends', function () {
  const class_ = new TsEntityFactory("Person","class")
    .extends("A","B","C")
    .if(false)
    .implements("D")
    .else()
    .implements("E")
    .endif() as TsEntityFactory

  expect(class_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`class Person extends A, B, C implements E {
}`)
});


it('test TsEntityFactory with field literal', function () {
  const interface_ = new TsEntityFactory("Person","interface")
  interface_.push("name:string")
  interface_.push("other:number")
  expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
  name:string
  other:number
}`)
});



it('test enum with field', function () {
  const interface_ = new TsEntityFactory("Status","enum")
  interface_.push("bad = 1")
  interface_.push("good = 0")


  expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`enum Status {
  bad = 1,
  good = 0
}`)
});




