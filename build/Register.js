"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
class Register {
    Value;
    friendlyName;
    constructor(friendlyName) {
        this.Value = 0;
        this.friendlyName = friendlyName;
    }
    setValue(data) {
        this.Value = data;
    }
    getValue() {
        return this.Value;
    }
}
exports.Register = Register;
