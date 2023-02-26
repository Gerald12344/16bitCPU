// com'puter

import { ALU } from "./ALU";
import { BusController } from "./busController";
import { GeneralPurpose } from "./GeneralPurpose";
import { OutputReg } from "./output";
import { ProgramCounter } from "./ProgramCounter";
import { RAM } from "./Ram";
import { Register } from "./Register";
import { CompileASM } from "./utils/CompilerASM";
import { Logger } from "./utils/Logger";
import { OpcodeSeparator } from "./utils/opcode";
import { Round2DB } from "./utils/round2DB";

let BitWidth = 50;
let Clock_Hertz = 5000;
const DEBUG = false;

export { BitWidth, Clock_Hertz, DEBUG }

let BUS = new BusController();

// Registers
let MAR = new Register("MAR");                                  // 0000000
let MDR = new Register("MDR");                                  // 0000001
let PC = new Register("PC");                                    // 0000010
let REG_A = new Register("RegA");                               // 0000011
let REG_B = new Register("RegB");                               // 0000100
let ACC = new Register("ACC");                                  // 0000101
let GEN = new GeneralPurpose({ friendlyName: "GEN", BUS });     // 0000110
let OUT = new Register("OUT");                                  // 0000111

let RIR = new Register("RIR");                                  // 0001000
let ROR = new Register("ROR");                                  // 0001001
let RAR = new Register("RAR");                                  // 0001010

let GPX = new Register("GPUX");
let GPY = new Register("GPUY");
let GPC = new Register("GPUCOL");

// Flags
let HLT = false;
let ADD = false;
let SUB = false;
let MUL = false;
let DIV = false;
let MOD = false;
let COMP = false;
let AND = false;

export { HLT, ADD, SUB, MUL, DIV, MOD, COMP, AND }
/*
let RAM_DATA: number[] = [
    0b0000100100000001,
    0b0000110000000011,

    0b0000100100000011,
    0b0000110000000100,

    0b0000101100000101,


    0b0000110000000111,
    0b0000011000000000
]*/


// Components
let RAM_Comp = new RAM({ MAR, MDR, RAM: CompileASM(), BUS, RIR, ROR, RAR })
let PCC_Comp = new ProgramCounter({ PC, BUS });
let ALU_Comp = new ALU({ REG_A, REG_B, ACC, BUS });
let OUT_Comp = new OutputReg({ BUS, OUT });




let flagHandler = (data: number) => {
    [ADD, SUB, MUL, DIV, MOD, COMP, AND] = [false, false, false, false, false, false, false];

    if (data === 0b00000000) {
        ADD = true
    } else if (data === 0b00000001) {
        SUB = true
    } else if (data === 0b00000010) {
        MUL = true
    } else if (data === 0b00000011) {
        DIV = true
    } else if (data === 0b00000100) {
        MOD = true
    } else if (data === 0b00000101) {
        COMP = true
    } else if (data === 0b00000110) {
        AND = true
    }

    ALU_Comp.calc(ALU_Comp.getREG_A(), ALU_Comp.getREG_B())

    Logger("Flags: " + [ADD, SUB, MUL, DIV, MOD, COMP, AND])

}


// Control Unit
let ControlUnit = () => {
    // -----FETCH----- \\

    // PC -> Bus
    BUS.hardCodeControlBus(0b00000010, 0b00000010);
    // Bus --> MAR
    BUS.hardCodeControlBus(0b00000001, 0b00000000);
    // MDR --> Data Bus
    BUS.hardCodeControlBus(0b00000010, 0b00000001);
    // Data Bus --> Control Unit
    let val = BUS.getDataBus();
    const { opcode, operand } = OpcodeSeparator(val);
    // Increment PC
    BUS.hardCodeControlBus(0b00000100, 0);

    // -----Decode----- \\




    // -----Execute----- \\

    BUS.setControlBus(val)

    if (opcode === 0) {
        HLT = true;
        Logger("PROGRAM HALTED")
    }

    if (opcode === 0b00000111) {
        flagHandler(operand)
    }

    Logger("----------------")
};




// ASYNC wait
let wait = (seconds: number) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

let total_clock_ticks = 0;
(async () => {
    let progStart = performance.now();
    while (HLT === false) {
        total_clock_ticks++
        let start = performance.now();
        ControlUnit();
        let end = performance.now();
        let time = end - start;
        await wait((1 / Clock_Hertz) - time)
    }

    let progEnd = performance.now();
    let progTime = progEnd - progStart;
    console.log("Program took " + Round2DB(progTime) + "ms to run, with an average clock speed of " + Round2DB(progTime / total_clock_ticks) + "ms per clock tick or " + Round2DB(1000 / (progTime / total_clock_ticks)) + " hertz");
})();

