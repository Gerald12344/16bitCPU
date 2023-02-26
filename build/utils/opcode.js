"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpcodeSeparator = void 0;
const __1 = require("..");
// This is just for optimization of emulator
let cache = {};
function OpcodeSeparator(opcode) {
    // Check cache
    if (cache[opcode]) {
        return cache[opcode];
    }
    // turn input to string for string methods 
    let inputString = `${(opcode ?? 0).toString(2)}`;
    // Change to array to split in half
    let inputArray = inputString.split("");
    inputArray = [...new Array(__1.BitWidth - inputArray.length).fill("0"), ...inputArray];
    // Work out halfway point
    const half = Math.ceil(inputArray.length / 2);
    // Get opcode and operand
    const first = inputArray.splice(0, half);
    const second = inputArray.splice(-half);
    // Generate opcode and operand
    let opOut = {
        opcode: parseInt(first.join(""), 2),
        operand: parseInt(second.join(""), 2)
    };
    // Cache
    cache[opcode] = opOut;
    // Return
    return opOut;
}
exports.OpcodeSeparator = OpcodeSeparator;
