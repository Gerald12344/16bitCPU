"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAM = void 0;
var _1 = require(".");
var Logger_1 = require("./utils/Logger");
var opcode_1 = require("./utils/opcode");
var RAM = /** @class */ (function () {
    function RAM(_a) {
        var MAR = _a.MAR, MDR = _a.MDR, RAM = _a.RAM, BUS = _a.BUS, RIR = _a.RIR, RAR = _a.RAR, ROR = _a.ROR;
        this.MAR = MAR;
        this.MDR = MDR;
        this.RAM = RAM !== null && RAM !== void 0 ? RAM : new Array(_1.BitWidth * _1.BitWidth).fill(0);
        this.BUS = BUS;
        this.RIR = RIR;
        this.ROR = ROR;
        this.RAR = RAR;
        this.start();
    }
    RAM.prototype.start = function () {
        var _this = this;
        this.BUS.listenToControlBus(function (data) {
            var _a = (0, opcode_1.OpcodeSeparator)(data), opcode = _a.opcode, operand = _a.operand;
            if (opcode === 1 && operand === 0) {
                (0, Logger_1.Logger)("Seting MAR to: " + _this.BUS.getDataBus());
                _this.MAR.setValue(_this.BUS.getDataBus());
                _this.MDR.setValue(_this.RAM[_this.MAR.getValue()]);
            }
            if (opcode === 2 && operand === 1) {
                (0, Logger_1.Logger)("Setting data bus to MDR value");
                _this.BUS.setDataBus(_this.MDR.getValue());
            }
            // Set RIR, Ram Input Register
            if (opcode === 1 && operand === 8) {
                (0, Logger_1.Logger)("Setting RIR to: " + _this.BUS.getDataBus());
                _this.RIR.setValue(_this.BUS.getDataBus());
            }
            // set RAR, Ram Address Register
            if (opcode === 1 && operand === 10) {
                (0, Logger_1.Logger)("Setting RAR to: " + _this.BUS.getDataBus());
                _this.RAR.setValue(_this.BUS.getDataBus());
            }
            // get ROR, Ram Output Register
            if (opcode === 2 && operand === 9) {
                (0, Logger_1.Logger)("Setting data bus to ROR value");
                _this.BUS.setDataBus(_this.ROR.getValue());
            }
            // STA
            if (opcode === 15) {
                (0, Logger_1.Logger)("Setting RAM value " + _this.RAR.getValue() + " to: " + _this.RIR.getValue());
                _this.RAM[_this.RAR.getValue()] = _this.RIR.getValue();
            }
            // LDA
            if (opcode === 16) {
                (0, Logger_1.Logger)("Setting ROR to: " + _this.RAM[_this.RAR.getValue()]);
                _this.ROR.setValue(_this.RAM[_this.RAR.getValue()]);
            }
        });
    };
    return RAM;
}());
exports.RAM = RAM;
