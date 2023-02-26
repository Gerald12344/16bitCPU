"use strict";
// Comp'ter bus controller
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusController = void 0;
const _1 = require(".");
const opcode_1 = require("./utils/opcode");
class BusController {
    ControlBus;
    DataBus;
    controlBusListeners;
    dataBusListeners;
    constructor() {
        this.ControlBus = 0;
        this.DataBus = 0;
        this.controlBusListeners = {};
        this.dataBusListeners = {};
    }
    setControlBus(data) {
        const { opcode } = (0, opcode_1.OpcodeSeparator)(data);
        this.ControlBus = data;
        this.controlBusListeners[opcode]?.forEach(e => {
            e(data);
        });
    }
    hardCodeControlBus(opcode, operand) {
        // Bitwdith / 2
        let halfBitWidth = _1.BitWidth / 2;
        let opcodeFull = `${opcode.toString(2)}`.split("");
        let operandFull = `${operand.toString(2)}`.split("");
        let opcodeFullPadded = [...(new Array(halfBitWidth - opcodeFull.length).fill("0")), ...opcodeFull];
        let operandFullPadded = [...(new Array(halfBitWidth - operandFull.length).fill("0")), ...operandFull];
        this.setControlBus(parseInt([...opcodeFullPadded, ...operandFullPadded].join(""), 2));
    }
    registerToControlBus(reg) {
        this.setControlBus(reg.getValue());
    }
    setDataBus(data) {
        this.DataBus = data;
        this.dataBusListeners[data]?.forEach(e => {
            e(data);
        });
    }
    registerToDataBus(reg) {
        this.setDataBus(reg.getValue());
    }
    getControlBus() {
        return this.ControlBus;
    }
    getDataBus() {
        return this.DataBus;
    }
    listenToControlBus(func, opcode) {
        if (this.controlBusListeners[opcode] === undefined)
            this.controlBusListeners[opcode] = [];
        this.controlBusListeners[opcode].push(func);
    }
    listenToDataBus(func, opcode) {
        if (this.controlBusListeners[opcode] === undefined)
            this.controlBusListeners[opcode] = [];
        this.dataBusListeners[opcode].push(func);
    }
}
exports.BusController = BusController;
