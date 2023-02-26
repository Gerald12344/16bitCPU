"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralPurpose = void 0;
const Register_1 = require("./Register");
const Logger_1 = require("./utils/Logger");
const opcode_1 = require("./utils/opcode");
class GeneralPurpose extends Register_1.Register {
    BUS;
    constructor({ friendlyName, BUS }) {
        super(friendlyName);
        this.BUS = BUS;
        this.start();
    }
    start() {
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            (0, Logger_1.Logger)("Setting data bus to GP value");
            this.BUS.hardCodeControlBus(0b00000010, operand);
            let val = this.BUS.getDataBus();
            this.setValue(val);
        }, 0b00001011);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            (0, Logger_1.Logger)("Setting data bus to GP value");
            this.BUS.setDataBus(this.getValue());
            this.BUS.hardCodeControlBus(0b00000001, operand);
        }, 0b00001100);
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            (0, Logger_1.Logger)("Setting GP value to: " + operand);
            this.setValue(operand);
        }, 0b00001001);
    }
}
exports.GeneralPurpose = GeneralPurpose;
