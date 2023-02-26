import { BusController } from "./busController";
import { Register } from "./Register";
import { OpcodeSeparator } from "./utils/opcode";
import { ADD, COMP, DIV, MOD, MUL, SUB, AND } from "./index";
import { Logger } from "./utils/Logger";


export class ALU {
    private REG_A: Register;
    private REG_B: Register;

    private ACC: Register;

    private BUS: BusController;

    private Zero: boolean = true;
    private Negative: boolean = false;

    constructor({ BUS, REG_A, REG_B, ACC }: { BUS: BusController, REG_A: Register, REG_B: Register, ACC: Register }) {
        this.REG_A = REG_A;
        this.REG_B = REG_B;
        this.ACC = ACC;
        this.BUS = BUS;

        this.start();
    }

    public getACC() {
        return this.ACC.getValue();
    }

    public getREG_A() {
        return this.REG_A.getValue();
    }

    public getREG_B() {
        return this.REG_B.getValue();
    }


    private start() {
        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            if (operand === 0b00000011) {
                Logger("Setting REG_A to: " + this.BUS.getDataBus());
                this.REG_A.setValue(this.BUS.getDataBus());
                this.calc(this.REG_A.getValue(), this.REG_B.getValue());
            }

            if (operand === 0b00000100) {
                Logger("Setting REG_B to: " + this.BUS.getDataBus());
                this.REG_B.setValue(this.BUS.getDataBus());
                this.calc(this.REG_A.getValue(), this.REG_B.getValue());
            }

        }, 0b00000001);

        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            if (this.Zero) {
                Logger("Jumping to: " + operand);


                this.BUS.hardCodeControlBus(0b00000101, operand);
            }

        }, 0b00001101);

        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            if (this.Negative) {
                Logger("Jumping to: " + operand);


                this.BUS.hardCodeControlBus(0b00000101, operand);
            }

        }, 0b00001110);



        this.BUS.listenToControlBus((data: number) => {
            let { operand } = OpcodeSeparator(data);

            if (operand === 0b00000101) {
                Logger("Setting data bus to ACC value " + this.ACC.getValue());
                this.BUS.setDataBus(this.ACC.getValue());
            }

        }, 0b00000010);




    }

    public calc(a: number, b: number) {
        if (SUB) {
            this.ACC.setValue(a - b);
        } else if (MUL) {
            this.ACC.setValue(a * b);
        } else if (DIV) {
            this.ACC.setValue(a / b);
        } else if (MOD) {
            this.ACC.setValue(a % b);
        } else if (COMP) {
            this.ACC.setValue(a === b ? 1 : 0);
        } else if (AND) {
            this.ACC.setValue(a & b);
        } else {
            this.ACC.setValue(a + b);
        }

        this.Zero = this.ACC.getValue() === 0;
        this.Negative = this.ACC.getValue() < 0;
    }
}