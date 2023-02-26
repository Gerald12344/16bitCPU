import { BusController } from "./busController";
import { Register } from "./Register";
import { Logger } from "./utils/Logger";
import { OpcodeSeparator } from "./utils/opcode";


export class GeneralPurpose extends Register {
    private BUS: BusController;
    constructor({ friendlyName, BUS }: { friendlyName: string, BUS: BusController }
    ) {
        super(friendlyName);
        this.BUS = BUS;
        this.start();
    }

    public start() {
        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            Logger("Setting data bus to GP value")
            this.BUS.hardCodeControlBus(0b00000010, operand);
            let val = this.BUS.getDataBus();
            this.setValue(val);

        }, 0b00001011);

        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            Logger("Setting data bus to GP value")
            this.BUS.setDataBus(this.getValue());
            this.BUS.hardCodeControlBus(0b00000001, operand);

        }, 0b00001100);

        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            Logger("Setting GP value to: " + operand)
            this.setValue(operand);

        }, 0b00001001);
    }



}