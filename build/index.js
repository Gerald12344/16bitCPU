"use strict";
// com'puter
Object.defineProperty(exports, "__esModule", { value: true });
exports.AND = exports.COMP = exports.MOD = exports.DIV = exports.MUL = exports.SUB = exports.ADD = exports.HLT = exports.DEBUG = exports.Clock_Hertz = exports.BitWidth = void 0;
const ALU_1 = require("./ALU");
const busController_1 = require("./busController");
const GeneralPurpose_1 = require("./GeneralPurpose");
const GPU_1 = require("./GPU");
const output_1 = require("./output");
const ProgramCounter_1 = require("./ProgramCounter");
const Ram_1 = require("./Ram");
const Register_1 = require("./Register");
const CompilerASM_1 = require("./utils/CompilerASM");
const Logger_1 = require("./utils/Logger");
const opcode_1 = require("./utils/opcode");
const round2DB_1 = require("./utils/round2DB");
let BitWidth = 50;
exports.BitWidth = BitWidth;
let Clock_Hertz = 5000000;
exports.Clock_Hertz = Clock_Hertz;
const DEBUG = false;
exports.DEBUG = DEBUG;
let BUS = new busController_1.BusController();
// Registers
let MAR = new Register_1.Register("MAR"); // 0000000
let MDR = new Register_1.Register("MDR"); // 0000001
let PC = new Register_1.Register("PC"); // 0000010
let REG_A = new Register_1.Register("RegA"); // 0000011
let REG_B = new Register_1.Register("RegB"); // 0000100
let ACC = new Register_1.Register("ACC"); // 0000101
let GEN = new GeneralPurpose_1.GeneralPurpose({ friendlyName: "GEN", BUS }); // 0000110
let OUT = new Register_1.Register("OUT"); // 0000111
let RIR = new Register_1.Register("RIR"); // 0001000
let ROR = new Register_1.Register("ROR"); // 0001001
let RAR = new Register_1.Register("RAR"); // 0001010
let GPX = new Register_1.Register("GPUX");
let GPY = new Register_1.Register("GPUY");
let GPC = new Register_1.Register("GPUCOL");
// Flags
let HLT = false;
exports.HLT = HLT;
let ADD = false;
exports.ADD = ADD;
let SUB = false;
exports.SUB = SUB;
let MUL = false;
exports.MUL = MUL;
let DIV = false;
exports.DIV = DIV;
let MOD = false;
exports.MOD = MOD;
let COMP = false;
exports.COMP = COMP;
let AND = false;
exports.AND = AND;
// Components
let RAM_Comp = new Ram_1.RAM({ MAR, MDR, RAM: (0, CompilerASM_1.CompileASM)(), BUS, RIR, ROR, RAR });
let PCC_Comp = new ProgramCounter_1.ProgramCounter({ PC, BUS });
let ALU_Comp = new ALU_1.ALU({ REG_A, REG_B, ACC, BUS });
let OUT_Comp = new output_1.OutputReg({ BUS, OUT });
let GPU_Comp = new GPU_1.GPU({ BUS, GPC, GPX, GPY });
let flagHandler = (data) => {
    var _a;
    _a = [false, false, false, false, false, false, false], exports.ADD = ADD = _a[0], exports.SUB = SUB = _a[1], exports.MUL = MUL = _a[2], exports.DIV = DIV = _a[3], exports.MOD = MOD = _a[4], exports.COMP = COMP = _a[5], exports.AND = AND = _a[6];
    if (data === 0b00000000) {
        exports.ADD = ADD = true;
    }
    else if (data === 0b00000001) {
        exports.SUB = SUB = true;
    }
    else if (data === 0b00000010) {
        exports.MUL = MUL = true;
    }
    else if (data === 0b00000011) {
        exports.DIV = DIV = true;
    }
    else if (data === 0b00000100) {
        exports.MOD = MOD = true;
    }
    else if (data === 0b00000101) {
        exports.COMP = COMP = true;
    }
    else if (data === 0b00000110) {
        exports.AND = AND = true;
    }
    ALU_Comp.calc(ALU_Comp.getREG_A(), ALU_Comp.getREG_B());
    (0, Logger_1.Logger)("Flags: " + [ADD, SUB, MUL, DIV, MOD, COMP, AND]);
};
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
    const { opcode, operand } = (0, opcode_1.OpcodeSeparator)(val);
    // Increment PC
    BUS.hardCodeControlBus(0b00000100, 0);
    // -----Decode----- \\
    // -----Execute----- \\
    BUS.setControlBus(val);
    if (opcode === 0) {
        exports.HLT = HLT = true;
        (0, Logger_1.Logger)("PROGRAM HALTED");
    }
    if (opcode === 0b00000111) {
        flagHandler(operand);
    }
    (0, Logger_1.Logger)("----------------");
};
// ASYNC wait
let wait = (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
let total_clock_ticks = 0;
(async () => {
    let progStart = performance.now();
    while (HLT === false) {
        total_clock_ticks++;
        ControlUnit();
    }
    let progEnd = performance.now();
    let progTime = progEnd - progStart;
    console.log("Program took " + (0, round2DB_1.Round2DB)(progTime) + "ms to run, with an average clock speed of " + (0, round2DB_1.Round2DB)(progTime / total_clock_ticks) + "ms per clock tick or " + (0, round2DB_1.Round2DB)(1000 / (progTime / total_clock_ticks)) + " hertz and did " + total_clock_ticks + " clock ticks");
})();
