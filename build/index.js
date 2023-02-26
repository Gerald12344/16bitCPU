"use strict";
// com'puter
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AND = exports.COMP = exports.MOD = exports.DIV = exports.MUL = exports.SUB = exports.ADD = exports.HLT = exports.DEBUG = exports.Clock_Hertz = exports.BitWidth = void 0;
var ALU_1 = require("./ALU");
var busController_1 = require("./busController");
var GeneralPurpose_1 = require("./GeneralPurpose");
var output_1 = require("./output");
var ProgramCounter_1 = require("./ProgramCounter");
var Ram_1 = require("./Ram");
var Register_1 = require("./Register");
var CompilerASM_1 = require("./utils/CompilerASM");
var Logger_1 = require("./utils/Logger");
var opcode_1 = require("./utils/opcode");
var round2DB_1 = require("./utils/round2DB");
var BitWidth = 50;
exports.BitWidth = BitWidth;
var Clock_Hertz = 5000;
exports.Clock_Hertz = Clock_Hertz;
var DEBUG = false;
exports.DEBUG = DEBUG;
var BUS = new busController_1.BusController();
// Registers
var MAR = new Register_1.Register("MAR"); // 0000000
var MDR = new Register_1.Register("MDR"); // 0000001
var PC = new Register_1.Register("PC"); // 0000010
var REG_A = new Register_1.Register("RegA"); // 0000011
var REG_B = new Register_1.Register("RegB"); // 0000100
var ACC = new Register_1.Register("ACC"); // 0000101
var GEN = new GeneralPurpose_1.GeneralPurpose({ friendlyName: "GEN", BUS: BUS }); // 0000110
var OUT = new Register_1.Register("OUT"); // 0000111
var RIR = new Register_1.Register("RIR"); // 0001000
var ROR = new Register_1.Register("ROR"); // 0001001
var RAR = new Register_1.Register("RAR"); // 0001010
var GPUX = new Register_1.Register("GPUX");
var GPUY = new Register_1.Register("GPUY");
var GPUCOL = new Register_1.Register("GPUCOL");
// Flags
var HLT = false;
exports.HLT = HLT;
var ADD = false;
exports.ADD = ADD;
var SUB = false;
exports.SUB = SUB;
var MUL = false;
exports.MUL = MUL;
var DIV = false;
exports.DIV = DIV;
var MOD = false;
exports.MOD = MOD;
var COMP = false;
exports.COMP = COMP;
var AND = false;
exports.AND = AND;
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
var RAM_Comp = new Ram_1.RAM({ MAR: MAR, MDR: MDR, RAM: (0, CompilerASM_1.CompileASM)(), BUS: BUS, RIR: RIR, ROR: ROR, RAR: RAR });
var PCC_Comp = new ProgramCounter_1.ProgramCounter({ PC: PC, BUS: BUS });
var ALU_Comp = new ALU_1.ALU({ REG_A: REG_A, REG_B: REG_B, ACC: ACC, BUS: BUS });
var OUT_Comp = new output_1.OutputReg({ BUS: BUS, OUT: OUT });
var flagHandler = function (data) {
    var _a;
    _a = [false, false, false, false, false, false, false], exports.ADD = ADD = _a[0], exports.SUB = SUB = _a[1], exports.MUL = MUL = _a[2], exports.DIV = DIV = _a[3], exports.MOD = MOD = _a[4], exports.COMP = COMP = _a[5], exports.AND = AND = _a[6];
    if (data === 0) {
        exports.ADD = ADD = true;
    }
    else if (data === 1) {
        exports.SUB = SUB = true;
    }
    else if (data === 2) {
        exports.MUL = MUL = true;
    }
    else if (data === 3) {
        exports.DIV = DIV = true;
    }
    else if (data === 4) {
        exports.MOD = MOD = true;
    }
    else if (data === 5) {
        exports.COMP = COMP = true;
    }
    else if (data === 6) {
        exports.AND = AND = true;
    }
    ALU_Comp.calc(ALU_Comp.getREG_A(), ALU_Comp.getREG_B());
    (0, Logger_1.Logger)("Flags: " + [ADD, SUB, MUL, DIV, MOD, COMP, AND]);
};
// Control Unit
var ControlUnit = function () {
    // -----FETCH----- \\
    // PC -> Bus
    BUS.hardCodeControlBus(2, 2);
    // Bus --> MAR
    BUS.hardCodeControlBus(1, 0);
    // MDR --> Data Bus
    BUS.hardCodeControlBus(2, 1);
    // Data Bus --> Control Unit
    var val = BUS.getDataBus();
    var _a = (0, opcode_1.OpcodeSeparator)(val), opcode = _a.opcode, operand = _a.operand;
    // Increment PC
    BUS.hardCodeControlBus(4, 0);
    // -----Decode----- \\
    // -----Execute----- \\
    BUS.setControlBus(val);
    if (opcode === 0) {
        exports.HLT = HLT = true;
        (0, Logger_1.Logger)("PROGRAM HALTED");
    }
    if (opcode === 7) {
        flagHandler(operand);
    }
    (0, Logger_1.Logger)("----------------");
};
// ASYNC wait
var wait = function (seconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, seconds * 1000); });
};
var total_clock_ticks = 0;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var progStart, start, end, time, progEnd, progTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                progStart = performance.now();
                _a.label = 1;
            case 1:
                if (!(HLT === false)) return [3 /*break*/, 3];
                total_clock_ticks++;
                start = performance.now();
                ControlUnit();
                end = performance.now();
                time = end - start;
                return [4 /*yield*/, wait((1 / Clock_Hertz) - time)];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3:
                progEnd = performance.now();
                progTime = progEnd - progStart;
                console.log("Program took " + (0, round2DB_1.Round2DB)(progTime) + "ms to run, with an average clock speed of " + (0, round2DB_1.Round2DB)(progTime / total_clock_ticks) + "ms per clock tick or " + (0, round2DB_1.Round2DB)(1000 / (progTime / total_clock_ticks)) + " hertz");
                return [2 /*return*/];
        }
    });
}); })();
