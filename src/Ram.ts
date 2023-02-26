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
            let { operand } = OpcodeSeparator(data);

            if (operand === 0b00000000) {
                Logger("Seting MAR to: " + this.BUS.getDataBus());
                this.MAR.setValue(this.BUS.getDataBus());
                this.MDR.setValue(this.RAM[this.MAR.getValue()]);
            }

            if (operand === 0b00001000) {
                Logger("Setting RIR to: " + this.BUS.getDataBus());
                this.RIR.setValue(this.BUS.getDataBus());
            }

            if (operand === 0b00001010) {
                Logger("Setting RAR to: " + this.BUS.getDataBus());
                this.RAR.setValue(this.BUS.getDataBus());
            }

        }, 0b00000001);



        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            if (operand === 0b00000001) {
                Logger("Setting data bus to MDR value");
                this.BUS.setDataBus(this.MDR.getValue());
            }

            if (operand === 0b00001001) {
                Logger("Setting data bus to ROR value");
                this.BUS.setDataBus(this.ROR.getValue());
            }
        }, 0b00000010);


        this.BUS.listenToControlBus((data: number) => {
            Logger("Setting RAM value " + this.RAR.getValue() + " to: " + this.RIR.getValue());
            this.RAM[this.RAR.getValue()] = this.RIR.getValue();
        }, 0b00001111);

        this.BUS.listenToControlBus((data: number) => {
            Logger("Setting ROR to: " + this.RAM[this.RAR.getValue()]);
            this.ROR.setValue(this.RAM[this.RAR.getValue()]);
        }, 0b00010000);





    }
}