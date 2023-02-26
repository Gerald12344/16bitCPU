import { BitWidth } from ".";
import { BusController } from "./busController";
import { Register } from "./Register";
import { Logger } from "./utils/Logger";
import { OpcodeSeparator } from "./utils/opcode";



export class RAM {
    private MAR: Register;
    private MDR: Register;

    private RIR: Register;
    private ROR: Register;
    private RAR: Register;

    private BUS: BusController;

    private RAM: number[];

    constructor({ MAR, MDR, RAM, BUS, RIR, RAR, ROR }: { MAR: Register, MDR: Register, RAM: number[], BUS: BusController, RIR: Register, ROR: Register, RAR: Register }) {
        this.MAR = MAR;
        this.MDR = MDR;
        this.RAM = RAM ?? new Array(BitWidth * BitWidth).fill(0);
        this.BUS = BUS;

        this.RIR = RIR;
        this.ROR = ROR;
        this.RAR = RAR;

        this.start();
    }

    private start() {
        this.BUS.listenToControlBus((data: number) => {
            let { opcode, operand } = OpcodeSeparator(data);



            if (opcode === 0b00000001 && operand === 0b00000000) {
                Logger("Seting MAR to: " + this.BUS.getDataBus());
                this.MAR.setValue(this.BUS.getDataBus());
                this.MDR.setValue(this.RAM[this.MAR.getValue()]);
            }
            if (opcode === 0b00000010 && operand === 0b00000001) {
                Logger("Setting data bus to MDR value");
                this.BUS.setDataBus(this.MDR.getValue());
            }

            // Set RIR, Ram Input Register
            if (opcode === 0b00000001 && operand === 0b00001000) {
                Logger("Setting RIR to: " + this.BUS.getDataBus());
                this.RIR.setValue(this.BUS.getDataBus());
            }

            // set RAR, Ram Address Register
            if (opcode === 0b00000001 && operand === 0b00001010) {
                Logger("Setting RAR to: " + this.BUS.getDataBus());
                this.RAR.setValue(this.BUS.getDataBus());
            }

            // get ROR, Ram Output Register
            if (opcode === 0b00000010 && operand === 0b00001001) {
                Logger("Setting data bus to ROR value");
                this.BUS.setDataBus(this.ROR.getValue());
            }

            // STA
            if (opcode === 0b00001111) {
                Logger("Setting RAM value " + this.RAR.getValue() + " to: " + this.RIR.getValue());
                this.RAM[this.RAR.getValue()] = this.RIR.getValue();
            }

            // LDA
            if (opcode === 0b00010000) {
                Logger("Setting ROR to: " + this.RAM[this.RAR.getValue()]);
                this.ROR.setValue(this.RAM[this.RAR.getValue()]);
            }








        });
    }
}