"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputReg = void 0;
var Logger_1 = require("./utils/Logger");
var opcode_1 = require("./utils/opcode");
var OutputReg = /** @class */ (function () {
    function OutputReg(_a) {
        var BUS = _a.BUS, OUT = _a.OUT;
        this.BUS = BUS;
        this.REG = OUT;
        this.start();
    }
    OutputReg.prototype.start = function () {
        var _this = this;
        this.BUS.listenToControlBus(function (data) {
            var _a = (0, opcode_1.OpcodeSeparator)(data), opcode = _a.opcode, operand = _a.operand;
            if (opcode === 6) {
                (0, Logger_1.Logger)("OutputReg");
                console.log(_this.REG.getValue());
            }
            if (opcode === 1 && operand === 7) {
                (0, Logger_1.Logger)("Setting OUT to: " + _this.BUS.getDataBus());
                _this.REG.setValue(_this.BUS.getDataBus());
            }
        });
    };
    return OutputReg;
}());
exports.OutputReg = OutputReg;
