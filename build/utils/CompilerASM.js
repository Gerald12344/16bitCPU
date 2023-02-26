"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileASM = void 0;
var fs_1 = require("fs");
var __1 = require("..");
var lookupTable = {
    "HLT": 0,
    "NOP": 3,
    "JMP": 5,
    "OUT": 6,
    "FLG": 7,
    "CON": 9,
    "GIN": 11,
    "GOT": 12,
    "BRZ": 13,
    "BRN": 14,
    "STA": 15,
    "LDA": 16,
};
var Registers = {
    "MAR": 0,
    "MDR": 1,
    "PC": 2,
    "A": 3,
    "B": 4,
    "ACC": 5,
    "GEN": 6,
    "OUT": 7,
    "RIR": 8,
    "ROR": 9,
    "RAR": 10,
};
var Flags = {
    "ADD": 0,
    "SUB": 1,
    "MUL": 2,
    "DIV": 3,
    "MOD": 4,
    "COMP": 5,
    "AND": 6,
};
function CompileASM() {
    var code = (0, fs_1.readFileSync)("./test.asm", "utf-8");
    var lines = code.split("\n").map(function (e) { return e === "" ? "NOP" : e; });
    var binOut = [];
    lines.forEach(function (e) {
        var _a = e.split(" "), opcode = _a[0], operand = _a[1];
        var opcodeBin = lookupTable[opcode];
        var operandBin = parseInt(operand, 10);
        if (opcode === "GIN" || opcode === "GOT") {
            operandBin = Registers[operand];
        }
        if (opcode === "FLG") {
            operandBin = Flags[operand];
        }
        binOut.push((opcodeBin << (__1.BitWidth / 2)) | operandBin);
    });
    return binOut;
}
exports.CompileASM = CompileASM;
