"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const __1 = require("..");
async function Logger(text) {
    if (__1.DEBUG) {
        console.log(text);
    }
}
exports.Logger = Logger;
