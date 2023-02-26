"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAM = void 0;
const _1 = require(".");
const Logger_1 = require("./utils/Logger");
const opcode_1 = require("./utils/opcode");
class RAM {
    MAR;
    MDR;
    RIR;
    ROR;
    RAR;
    BUS;
    RAM;
    constructor({ MAR, MDR, RAM, BUS, RIR, RAR, ROR }) {
        this.MAR = MAR;
        this.MDR = MDR;
        this.RAM = RAM ?? new Array(_1.BitWidth * _1.BitWidth).fill(0);
        this.BUS = BUS;
        this.RIR = RIR;
        this.ROR = ROR;
        this.RAR = RAR;
        this.start();
    }
    start() {
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00000000) {
                (0, Logger_1.Logger)("Seting MAR to: " + this.BUS.getDataBus());
                this.MAR.setValue(this.BUS.getDataBus());
                this.MDR.setValue(this.RAM[this.MAR.getValue()]);
            }
            if (operand === 0b00001000) {
                (0, Logger_1.Logger)("Setting RIR to: " + this.BUS.getDataBus());
                this.RIR.setValue(this.BUS.getDataBus());
            }
            if (operand === 0b00001010) {
                (0, Logger_1.Logger)("Setting RAR to: " + this.BUS.getDataBus());
                this.RAR.setValue(this.BUS.getDataBus());
            }
        }, 0b00000001);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00000001) {
                (0, Logger_1.Logger)("Setting data bus to MDR value");
                this.BUS.setDataBus(this.MDR.getValue());
            }
            if (operand === 0b00001001) {
                (0, Logger_1.Logger)("Setting data bus to ROR value");
                this.BUS.setDataBus(this.ROR.getValue());
            }
        }, 0b00000010);
        this.BUS.listenToControlBus((data) => {
            (0, Logger_1.Logger)("Setting RAM value " + this.RAR.getValue() + " to: " + this.RIR.getValue());
            this.RAM[this.RAR.getValue()] = this.RIR.getValue();
        }, 0b00001111);
        this.BUS.listenToControlBus((data) => {
            (0, Logger_1.Logger)("Setting ROR to: " + this.RAM[this.RAR.getValue()]);
            this.ROR.setValue(this.RAM[this.RAR.getValue()]);
        }, 0b00010000);
    }
}
exports.RAM = RAM;
