"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALU = void 0;
const opcode_1 = require("./utils/opcode");
const index_1 = require("./index");
const Logger_1 = require("./utils/Logger");
class ALU {
    REG_A;
    REG_B;
    ACC;
    BUS;
    Zero = true;
    Negative = false;
    constructor({ BUS, REG_A, REG_B, ACC }) {
        this.REG_A = REG_A;
        this.REG_B = REG_B;
        this.ACC = ACC;
        this.BUS = BUS;
        this.start();
    }
    getACC() {
        return this.ACC.getValue();
    }
    getREG_A() {
        return this.REG_A.getValue();
    }
    getREG_B() {
        return this.REG_B.getValue();
    }
    start() {
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00000011) {
                (0, Logger_1.Logger)("Setting REG_A to: " + this.BUS.getDataBus());
                this.REG_A.setValue(this.BUS.getDataBus());
                this.calc(this.REG_A.getValue(), this.REG_B.getValue());
            }
            if (operand === 0b00000100) {
                (0, Logger_1.Logger)("Setting REG_B to: " + this.BUS.getDataBus());
                this.REG_B.setValue(this.BUS.getDataBus());
                this.calc(this.REG_A.getValue(), this.REG_B.getValue());
            }
        }, 0b00000001);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (this.Zero) {
                (0, Logger_1.Logger)("Jumping to: " + operand);
                this.BUS.hardCodeControlBus(0b00000101, operand);
            }
        }, 0b00001101);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (this.Negative) {
                (0, Logger_1.Logger)("Jumping to: " + operand);
                this.BUS.hardCodeControlBus(0b00000101, operand);
            }
        }, 0b00001110);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00000101) {
                (0, Logger_1.Logger)("Setting data bus to ACC value " + this.ACC.getValue());
                this.BUS.setDataBus(this.ACC.getValue());
            }
        }, 0b00000010);
    }
    calc(a, b) {
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
    }
}
exports.ALU = ALU;
