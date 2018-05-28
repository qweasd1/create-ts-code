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
    if (typeof tsNode === "string") {
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
//# sourceMappingURL=util.js.map