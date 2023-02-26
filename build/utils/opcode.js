"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpcodeSeparator = void 0;
var __1 = require("..");
// This is just for optimization of emulator
var cache = {};
function OpcodeSeparator(opcode) {
    // Check cache
    if (cache[opcode]) {
        return cache[opcode];
    }
    // turn input to string for string methods 
    var inputString = "".concat((opcode !== null && opcode !== void 0 ? opcode : 0).toString(2));
    // Change to array to split in half
    var inputArray = inputString.split("");
    inputArray = __spreadArray(__spreadArray([], new Array(__1.BitWidth - inputArray.length).fill("0"), true), inputArray, true);
    // Work out halfway point
    var half = Math.ceil(inputArray.length / 2);
    // Get opcode and operand
    var first = inputArray.splice(0, half);
    var second = inputArray.splice(-half);
    // Generate opcode and operand
    var opOut = {
        opcode: parseInt(first.join(""), 2),
        operand: parseInt(second.join(""), 2)
    };
    // Cache
    cache[opcode] = opOut;
    // Return
    return opOut;
}
exports.OpcodeSeparator = OpcodeSeparator;
