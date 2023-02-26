


export class Register {
    private Value: number;
    public friendlyName: string;


    constructor(friendlyName: string) {
        this.Value = 0;
        this.friendlyName = friendlyName;
    }

    public setValue(data: number) {
        this.Value = data;
    }

    public getValue() {
        return this.Value;
    }

}