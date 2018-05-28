"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const util_1 = require("./model/util");
function generate(statements, config = { EOL: os_1.EOL, indent: "  " }) {
    return util_1.tsNodesToLines(statements, config).join(config.EOL);
}
exports.generate = generate;
function file(code) {
}
exports.file = file;
file(({ $let, $const, $public, $protect, $import, $class, $annotation, $method, $constructor, $line, $field, $export }) => {
    $public.field("test").type("some").equals({ a: "1" });
    $import("@angular/core").if(isInit).imports("OnInit");
    $line(2);
    $annotation("Component", {
        selector: "some"
    });
    $export.class("SomeComponent").if(isInit).implements("OnInit").endif()
        .body(() => {
        // columns
        ["name", "age"].forEach((column) => {
            $annotation("Column", {
                default: "true"
            });
            $field(`${column}:string`);
            $line();
        });
        $line();
    });
    $let("t = 1");
    $export.const("some = 1");
    $export.default.class("some");
    $export.default.field({
        some: "1"
    });
    $export.class("some").body(() => {
        $field("x = 1");
        $field("x = 2");
        $constructor().args("aa").body(() => {
            $line("this.x = 2");
            $line("this.y = 4");
        });
        $method("third").returns("number").body(() => {
            $line("return Math.sqrt(this.x * this.x + this.y * this.y)");
        });
    });
});
exports.default = name;
//# sourceMappingURL=createTsCode.js.map