"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALU = void 0;
var opcode_1 = require("./utils/opcode");
var index_1 = require("./index");
var Logger_1 = require("./utils/Logger");
var ALU = /** @class */ (function () {
    function ALU(_a) {
        var BUS = _a.BUS, REG_A = _a.REG_A, REG_B = _a.REG_B, ACC = _a.ACC;
        this.Zero = true;
        this.Negative = false;
        this.REG_A = REG_A;
        this.REG_B = REG_B;
        this.ACC = ACC;
        this.BUS = BUS;
        this.start();
    }
    ALU.prototype.getACC = function () {
        return this.ACC.getValue();
    };
    ALU.prototype.getREG_A = function () {
        return this.REG_A.getValue();
    };
    ALU.prototype.getREG_B = function () {
        return this.REG_B.getValue();
    };
    ALU.prototype.start = function () {
        var _this = this;
        this.BUS.listenToControlBus(function (data) {
            var _a = (0, opcode_1.OpcodeSeparator)(data), opcode = _a.opcode, operand = _a.operand;
            if (opcode === 1) {
                if (operand === 3) {
                    (0, Logger_1.Logger)("Setting REG_A to: " + _this.BUS.getDataBus());
                    _this.REG_A.setValue(_this.BUS.getDataBus());
                    _this.calc(_this.REG_A.getValue(), _this.REG_B.getValue());
                }
                if (operand === 4) {
                    (0, Logger_1.Logger)("Setting REG_B to: " + _this.BUS.getDataBus());
                    _this.REG_B.setValue(_this.BUS.getDataBus());
                    _this.calc(_this.REG_A.getValue(), _this.REG_B.getValue());
                }
            }
            ;
            if (opcode === 13 && _this.Zero) {
                (0, Logger_1.Logger)("Jumping to: " + operand);
                _this.BUS.hardCodeControlBus(5, operand);
            }
            if (opcode === 14 && _this.Negative) {
                (0, Logger_1.Logger)("Jumping to: " + operand);
                _this.BUS.hardCodeControlBus(5, operand);
            }
            if (opcode === 2) {
                if (operand === 5) {
                    (0, Logger_1.Logger)("Setting data bus to ACC value " + _this.ACC.getValue());
                    _this.BUS.setDataBus(_this.ACC.getValue());
                }
            }
        });
    };
    ALU.prototype.calc = function (a, b) {
        if (index_1.SUB) {
            this.ACC.setValue(a - b);
        }
        else if (index_1.MUL) {
            this.ACC.setValue(a * b);
        }
        else if (index_1.DIV) {
            this.ACC.setValue(a / b);
        }
        else if (index_1.MOD) {
            this.ACC.setValue(a % b);
        }
        else if (index_1.COMP) {
            this.ACC.setValue(a === b ? 1 : 0);
        }
        else if (index_1.AND) {
            this.ACC.setValue(a & b);
        }
        else {
            this.ACC.setValue(a + b);
        }
        this.Zero = this.ACC.getValue() === 0;
        this.Negative = this.ACC.getValue() < 0;
    };
    return ALU;
}());
exports.ALU = ALU;
