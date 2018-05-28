import {generate} from "../src/createTsCode";
import {TsImportFacotry} from "../src/model/TsImportFactory";
import {TsEntityFactory} from "../src/model/TsEntityFactory";
import {TsFunctionFactory} from "../src/model/TsFunctionFactory";
import {TsObjectFactory} from "../src/model/TsObjectFactory";
import {TsConcatFactory} from "../src/model/TsConcatFactory";
import {EMPTY_LINE} from "../src/model/util";

// it('test generate class', function () {
//   expect(generate([
//     new TsImportFacotry().addLiteral("import { Component } from '@angular/core'"),
//     EMPTY_LINE,
//     new TsFunctionFactory("@Component","method").ignoreBody()
//       .addArgs(new TsObjectFactory({
//         selector:'"some-component"'
//       }).multiline()),
//     new TsConcatFactory().setPrefix("export ").setFollwing(new TsEntityFactory("SomeComponent", "class")
//       .emptyLine()
//       .addLiterals(
//         new TsFunctionFactory("constructor","method").multiline()
//       )
//       .emptyLine()),
//
//   ])).toEqual(`import { Component } from '@angular/core';
//
// @Component({
//   selector:"some-component"
// })
// export class SomeComponent {
//
//   constructor() {
//
//   }
//
// }
// `)
// });

it('should success', function () {

});