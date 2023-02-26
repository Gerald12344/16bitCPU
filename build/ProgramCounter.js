"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramCounter = void 0;
const Logger_1 = require("./utils/Logger");
const opcode_1 = require("./utils/opcode");
class ProgramCounter {
    PC;
    BUS;
    constructor({ BUS, PC }) {
        this.PC = PC;
        this.PC.setValue(0);
        this.BUS = BUS;
        this.start();
    }
    getValue() {
        return this.PC.getValue();
    }
    start() {
        this.BUS.listenToControlBus((data) => {
            (0, Logger_1.Logger)("Incrementing PC");
            this.PC.setValue(this.PC.getValue() + 1);
        }, 0b00000100);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00000010) {
                (0, Logger_1.Logger)("Setting data bus to PC value");
                this.BUS.setDataBus(this.PC.getValue());
            }
        }, 0b00000010);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            (0, Logger_1.Logger)("JUMP PC to: " + operand);
            this.PC.setValue(operand);
        }, 0b00000101);
    }
}
exports.ProgramCounter = ProgramCounter;
