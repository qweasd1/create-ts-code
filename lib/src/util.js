"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=util.js.map