"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputReg = void 0;
const Logger_1 = require("./utils/Logger");
const opcode_1 = require("./utils/opcode");
class OutputReg {
    BUS;
    REG;
    constructor({ BUS, OUT }) {
        this.BUS = BUS;
        this.REG = OUT;
        this.start();
    }
    start() {
        this.BUS.listenToControlBus((data) => {
            (0, Logger_1.Logger)("OutputReg");
            console.log(this.REG.getValue());
        }, 0b00000110);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00000111) {
                (0, Logger_1.Logger)("Setting OUT to: " + this.BUS.getDataBus());
                this.REG.setValue(this.BUS.getDataBus());
            }
        }, 0b00000001);
    }
}
exports.OutputReg = OutputReg;
