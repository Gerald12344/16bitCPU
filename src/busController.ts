// Comp'ter bus controller

import { BitWidth } from ".";
import { Register } from "./Register";
import { OpcodeSeparator } from "./utils/opcode";


export class BusController {
    private ControlBus: number;
    private DataBus: number;

    private controlBusListeners: emptyFunc[];
    private dataBusListeners: emptyFunc[];

    constructor() {
        this.ControlBus = 0;
        this.DataBus = 0;
        this.controlBusListeners = [];
        this.dataBusListeners = [];
    }

    public setControlBus(data: number) {
        this.ControlBus = data;
        this.controlBusListeners.forEach(e => {
            e(data)
        })

    }

    public hardCodeControlBus(opcode: number, operand: number) {
        // Bitwdith / 2
        let halfBitWidth = BitWidth / 2;
        let opcodeFull = `${opcode.toString(2)}`.split("");
        let operandFull = `${operand.toString(2)}`.split("");

        let opcodeFullPadded = [...(new Array(halfBitWidth - opcodeFull.length).fill("0")), ...opcodeFull]
        let operandFullPadded = [...(new Array(halfBitWidth - operandFull.length).fill("0")), ...operandFull]


        this.setControlBus(parseInt([...opcodeFullPadded, ...operandFullPadded].join(""), 2))
    }




    public registerToControlBus(reg: Register) {
        this.setControlBus(reg.getValue());
    }

    public setDataBus(data: number) {
        this.DataBus = data;
        this.dataBusListeners.forEach(e => {
            e(data)
        })
    }

    public registerToDataBus(reg: Register) {
        this.setDataBus(reg.getValue());
    }

    public getControlBus() {
        return this.ControlBus;
    }

    public getDataBus() {
        return this.DataBus;
    }

    public listenToControlBus(func: emptyFunc) {
        this.controlBusListeners.push(func);
    }

    public listenToDataBus(func: emptyFunc) {
        this.dataBusListeners.push(func);
    }



}