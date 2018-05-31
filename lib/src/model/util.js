"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TsObjectFactory_1 = require("./TsObjectFactory");
const TsNodeFactory_1 = require("./TsNodeFactory");
const TsArrayFactory_1 = require("./TsArrayFactory");
function toArray(map) {
    const iterator = map.values();
    const result = [];
    while (true) {
        let { value, done } = iterator.next();
        if (done) {
            break;
        }
        else {
            result.push(value);
        }
    }
    return result;
}
exports.toArray = toArray;
exports.EMPTY_LINE = "";
function tsNodesToLines(tsNodes, config) {
    const result = [];
    tsNodes.forEach((tsNode) => {
        result.push(...tsNodeToLines(tsNode, config));
    });
    return result;
}
exports.tsNodesToLines = tsNodesToLines;
function tsNodeToLines(tsNode, config) {
    const result = [];
    if (typeof tsNode === "number" || typeof tsNode === "boolean" || tsNode === undefined || tsNode === null) {
        result.push(String(tsNode));
    }
    else if (typeof tsNode === "string") {
        result.push(tsNode);
    }
    else if (Array.isArray(tsNode)) {
        new TsArrayFactory_1.TsArrayFactory(tsNode).createCodeLines(config).forEach((line) => {
            result.push(line);
        });
    }
    else if (tsNode instanceof TsNodeFactory_1.TsNodeFactory) {
        tsNode.createCodeLines(config).forEach((line) => {
            result.push(line);
        });
    }
    else if (typeof tsNode === "object") {
        new TsObjectFactory_1.TsObjectFactory(tsNode).createCodeLines(config).forEach((line) => {
            result.push(line);
        });
    }
    return result;
}
exports.tsNodeToLines = tsNodeToLines;
const SINGLE_STRING_PATTERN = /['\\\n\r\u2028\u2029]/g;
const DOUBLE_STRING_PATTERN = /["\\\n\r\u2028\u2029]/g;
const TEMPLATE_STRING_PATTERN = /[`\\\n\r\u2028\u2029]/g;
function sstr(text) {
    return "'" + ('' + text).replace(SINGLE_STRING_PATTERN, function (character) {
        switch (character) {
            case "'":
            case '\\':
                return '\\' + character;
            // Four possible LineTerminator characters need to be escaped:
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\u2028':
                return '\\u2028';
            case '\u2029':
                return '\\u2029';
        }
    }) + "'";
}
exports.sstr = sstr;
function dstr(text) {
    return '"' + ('' + text).replace(DOUBLE_STRING_PATTERN, function (character) {
        switch (character) {
            case '"':
            case '\\':
                return '\\' + character;
            // Four possible LineTerminator characters need to be escaped:
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\u2028':
                return '\\u2028';
            case '\u2029':
                return '\\u2029';
        }
    }) + '"';
}
exports.dstr = dstr;
function tstr(text) {
    return "`" + ('' + text).replace(TEMPLATE_STRING_PATTERN, function (character) {
        switch (character) {
            case '`':
            case '\\':
                return '\\' + character;
            // Four possible LineTerminator characters need to be escaped:
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\u2028':
                return '\\u2028';
            case '\u2029':
                return '\\u2029';
        }
    }) + "`";
}
exports.tstr = tstr;
//# sourceMappingURL=util.js.map