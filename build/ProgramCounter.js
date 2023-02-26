"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramCounter = void 0;
var Logger_1 = require("./utils/Logger");
var opcode_1 = require("./utils/opcode");
var ProgramCounter = /** @class */ (function () {
    function ProgramCounter(_a) {
        var BUS = _a.BUS, PC = _a.PC;
        this.PC = PC;
        this.PC.setValue(0);
        this.BUS = BUS;
        this.start();
    }
    ProgramCounter.prototype.getValue = function () {
        return this.PC.getValue();
    };
    ProgramCounter.prototype.start = function () {
        var _this = this;
        this.BUS.listenToControlBus(function (data) {
            var _a = (0, opcode_1.OpcodeSeparator)(data), opcode = _a.opcode, operand = _a.operand;
            if (opcode === 4) {
                (0, Logger_1.Logger)("Incrementing PC");
                _this.PC.setValue(_this.PC.getValue() + 1);
            }
            if (opcode === 2 && operand === 2) {
                (0, Logger_1.Logger)("Setting data bus to PC value");
                _this.BUS.setDataBus(_this.PC.getValue());
            }
            if (opcode === 5) {
                (0, Logger_1.Logger)("JUMP PC to: " + operand);
                _this.PC.setValue(operand);
            }
        });
    };
    return ProgramCounter;
}());
exports.ProgramCounter = ProgramCounter;
