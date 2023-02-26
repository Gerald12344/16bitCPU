import { BusController } from "./busController";
import { Register } from "./Register";
import { OpcodeSeparator } from "./utils/opcode";

// CPU screen size 
const screensize = 28;

export class GPU {
    private REG_X: Register;
    private REG_Y: Register;

    private COL: Register;

    private BUS: BusController;

    private screen: number[][];

    constructor({ BUS, GPX, GPY, GPC }: { BUS: BusController, GPX: Register, GPY: Register, GPC: Register }) {
        this.BUS = BUS;
        this.REG_X = GPX;
        this.REG_Y = GPY;
        this.COL = GPC;

        this.screen = new Array(screensize).fill(0).map(() => new Array(screensize).fill(0));

        this.start();
    };


    private start() {
        this.BUS.listenToControlBus((data: number) => {
            const { opcode, operand } = OpcodeSeparator(data);

            if (opcode === 0b00000001) {
                if (operand === 0b00001011) {
                    this.REG_X.setValue(this.BUS.getDataBus());
                }
                if (operand === 0b00001100) {
                    this.REG_Y.setValue(this.BUS.getDataBus());
                }
                if (operand === 0b00001101) {
                    this.COL.setValue(this.BUS.getDataBus());
                }
            }

        });
    }

    public fetchAllData() {
        return this.screen;
    }
}