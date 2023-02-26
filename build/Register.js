"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
var Register = /** @class */ (function () {
    function Register(friendlyName) {
        this.Value = 0;
        this.friendlyName = friendlyName;
    }
    Register.prototype.setValue = function (data) {
        this.Value = data;
    };
    Register.prototype.getValue = function () {
        return this.Value;
    };
    return Register;
}());
exports.Register = Register;
