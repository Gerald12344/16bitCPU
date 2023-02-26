"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPU = void 0;
const opcode_1 = require("./utils/opcode");
// CPU screen size 
const screensize = 28;
class GPU {
    REG_X;
    REG_Y;
    COL;
    BUS;
    screen;
    constructor({ BUS, GPX, GPY, GPC }) {
        this.BUS = BUS;
        this.REG_X = GPX;
        this.REG_Y = GPY;
        this.COL = GPC;
        this.screen = new Array(screensize).fill(0).map(() => new Array(screensize).fill(0));
        this.start();
    }
    ;
    start() {
        this.BUS.listenToControlBus((data) => {
            let { operand } = (0, opcode_1.OpcodeSeparator)(data);
            if (operand === 0b00001011) {
                this.REG_X.setValue(this.BUS.getDataBus());
            }
            if (operand === 0b00001100) {
                this.REG_Y.setValue(this.BUS.getDataBus());
            }
            if (operand === 0b00001101) {
                this.COL.setValue(this.BUS.getDataBus());
            }
        }, 0b00001011);
    }
    fetchAllData() {
        return this.screen;
    }
}
exports.GPU = GPU;
