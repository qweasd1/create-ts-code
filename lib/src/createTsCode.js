"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const syntax_1 = require("./syntax/syntax");
function file(code, config = {
    EOL: os_1.EOL,
    indent: "  "
}) {
    const context = new syntax_1.NewFileContext();
    code(context, context);
    return context.createTsCode(config);
}
exports.file = file;
//# sourceMappingURL=createTsCode.js.map