"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompileASM = void 0;
const fs_1 = require("fs");
const __1 = require("..");
let lookupTable = {
    "HLT": 0b00000000,
    "NOP": 0b00000011,
    "JMP": 0b00000101,
    "OUT": 0b00000110,
    "FLG": 0b00000111,
    "CON": 0b00001001,
    "GIN": 0b00001011,
    "GOT": 0b00001100,
    "BRZ": 0b00001101,
    "BRN": 0b00001110,
    "STA": 0b00001111,
    "LDA": 0b00010000,
};
let Registers = {
    "MAR": 0b00000000,
    "MDR": 0b00000001,
    "PC": 0b00000010,
    "A": 0b00000011,
    "B": 0b00000100,
    "ACC": 0b00000101,
    "GEN": 0b00000110,
    "OUT": 0b00000111,
    "RIR": 0b00001000,
    "ROR": 0b00001001,
    "RAR": 0b00001010,
    "GPX": 0b00001011,
    "GPY": 0b00001100,
    "GPC": 0b00001101,
};
let Flags = {
    "ADD": 0b00000000,
    "SUB": 0b00000001,
    "MUL": 0b00000010,
    "DIV": 0b00000011,
    "MOD": 0b00000100,
    "COMP": 0b00000101,
    "AND": 0b00000110,
};
function CompileASM() {
    let code = (0, fs_1.readFileSync)("./test.asm", "utf-8");
    let lines = code.split("\n").map(e => e === "" ? "NOP" : e);
    const binOut = [];
    lines.forEach(e => {
        let [opcode, operand] = e.split(" ");
        let opcodeBin = lookupTable[opcode];
        let operandBin = parseInt(operand, 10);
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
