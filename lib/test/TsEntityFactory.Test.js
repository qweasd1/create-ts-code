"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsEntityFactory_1 = require("../src/model/TsEntityFactory");
const TsObjectFactory_1 = require("../src/model/TsObjectFactory");
const os_1 = require("os");
const DEFAULT_CREATE_CODE_CONFIG = {
    indent: "  ",
    EOL: os_1.EOL
};
it('test TsEntityFactory with nothing', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
}`);
});
it('test TsEntityFactory with implements', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface")
        .implements("A", "B", "C")
        .if(false)
        .implements("D")
        .else()
        .implements("E")
        .endIf();
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person implements A, B, C, E {
}`);
});
it('test TsEntityFactory with extends', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "class")
        .exntends("A", "B", "C")
        .if(false)
        .implements("D")
        .else()
        .implements("E")
        .endIf();
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`class Person extends A, B, C implements E {
}`);
});
it('test TsEntityFactory with export', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface")
        .export();
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`export interface Person {
}`);
});
it('test TsEntityFactory with field literal', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface")
        .addLiterals("name:string")
        .addLiterals("other:number");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
  name:string
  other:number
}`);
});
it('test TsEntityFactory with field map', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Person", "interface")
        .add("name", "name:string")
        .add("name", "name:number");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`interface Person {
  name:string
}`);
});
it('test enum with field', function () {
    const interface_ = new TsEntityFactory_1.TsEntityFactory("Status", "enum")
        .addLiterals("bad = 1")
        .add("good", "good = 0");
    expect(interface_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`enum Status {
  bad = 1,
  good = 0
}`);
});
it('test class with annotation', function () {
    const class_ = new TsEntityFactory_1.TsEntityFactory("Person", "class")
        .addLiterals("bad = 1")
        .add("good", "good = 0")
        .addDecoratorLiterals("@Entity()");
    expect(class_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`@Entity()
class Person {
  bad = 1
  good = 0
}`);
});
it('test class with annotation using object', function () {
    const class_ = new TsEntityFactory_1.TsEntityFactory("Person", "class")
        .addLiterals("bad = 1")
        .add("good", "good = 0")
        .addDecoratorLiterals(`@Entity(${new TsObjectFactory_1.TsObjectFactory({ a: "1" }).multiline().createCode(DEFAULT_CREATE_CODE_CONFIG)})`);
    expect(class_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`@Entity({
  a:1
})
class Person {
  bad = 1
  good = 0
}`);
});
it('test component class for angular', function () {
    const isInit = true;
    const class_ = new TsEntityFactory_1.TsEntityFactory("SomeComponent", "class")
        .implements("OnInit")
        .addDecoratorLiterals("@Component({select:'some'})")
        .emptyLine()
        .if(isInit)
        .addLiterals("constructor(){}")
        .emptyLine()
        .addLiterals("ngOnInit(){}")
        .endIf()
        .emptyLine();
    expect(class_.createCode(DEFAULT_CREATE_CODE_CONFIG)).toEqual(`@Component({select:'some'})
class SomeComponent implements OnInit {
  
  constructor(){}
  
  ngOnInit(){}
  
}`);
});
//# sourceMappingURL=TsEntityFactory.Test.js.map