import { BusController } from "./busController";
import { Register } from "./Register";
import { Logger } from "./utils/Logger";
import { OpcodeSeparator } from "./utils/opcode";


export class ProgramCounter {
    private PC: Register
    private BUS: BusController;

    constructor({ BUS, PC }: { BUS: BusController, PC: Register }) {
        this.PC = PC;
        this.PC.setValue(0);
        this.BUS = BUS;

        this.start();
    }

    public getValue() {
        return this.PC.getValue();
    }

    private start() {
        this.BUS.listenToControlBus((data: number) => {
            let { opcode, operand } = OpcodeSeparator(data);

            if (opcode === 0b00000100) {
                Logger("Incrementing PC")
                this.PC.setValue(this.PC.getValue() + 1);
            }

            if (opcode === 0b00000010 && operand === 0b00000010) {
                Logger("Setting data bus to PC value")
                this.BUS.setDataBus(this.PC.getValue());
            }

            if (opcode === 0b00000101) {
                Logger("JUMP PC to: " + operand)
                this.PC.setValue(operand);
            }
        });
    }
}