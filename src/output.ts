import { BusController } from "./busController";
import { Register } from "./Register";
import { Logger } from "./utils/Logger";
import { OpcodeSeparator } from "./utils/opcode";


export class OutputReg {
    private BUS: BusController;
    private REG: Register;

    constructor({ BUS, OUT }: { BUS: BusController, OUT: Register }) {
        this.BUS = BUS;
        this.REG = OUT;
        this.start();
    }



    private start() {
        this.BUS.listenToControlBus((data: number) => {
            let { opcode, operand } = OpcodeSeparator(data);

            if (opcode === 0b00000110) {
                Logger("OutputReg")
                console.log(this.REG.getValue())
            }

            if (opcode === 0b00000001 && operand === 0b00000111) {
                Logger("Setting OUT to: " + this.BUS.getDataBus());
                this.REG.setValue(this.BUS.getDataBus());
            }


        });
    }
}