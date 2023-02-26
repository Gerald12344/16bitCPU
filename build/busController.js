"use strict";
// Comp'ter bus controller
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusController = void 0;
var _1 = require(".");
var BusController = /** @class */ (function () {
    function BusController() {
        this.ControlBus = 0;
        this.DataBus = 0;
        this.controlBusListeners = [];
        this.dataBusListeners = [];
    }
    BusController.prototype.setControlBus = function (data) {
        this.ControlBus = data;
        this.controlBusListeners.forEach(function (e) {
            e(data);
        });
    };
    BusController.prototype.hardCodeControlBus = function (opcode, operand) {
        // Bitwdith / 2
        var halfBitWidth = _1.BitWidth / 2;
        var opcodeFull = "".concat(opcode.toString(2)).split("");
        var operandFull = "".concat(operand.toString(2)).split("");
        var opcodeFullPadded = __spreadArray(__spreadArray([], (new Array(halfBitWidth - opcodeFull.length).fill("0")), true), opcodeFull, true);
        var operandFullPadded = __spreadArray(__spreadArray([], (new Array(halfBitWidth - operandFull.length).fill("0")), true), operandFull, true);
        this.setControlBus(parseInt(__spreadArray(__spreadArray([], opcodeFullPadded, true), operandFullPadded, true).join(""), 2));
    };
    BusController.prototype.registerToControlBus = function (reg) {
        this.setControlBus(reg.getValue());
    };
    BusController.prototype.setDataBus = function (data) {
        this.DataBus = data;
        this.dataBusListeners.forEach(function (e) {
            e(data);
        });
    };
    BusController.prototype.registerToDataBus = function (reg) {
        this.setDataBus(reg.getValue());
    };
    BusController.prototype.getControlBus = function () {
        return this.ControlBus;
    };
    BusController.prototype.getDataBus = function () {
        return this.DataBus;
    };
    BusController.prototype.listenToControlBus = function (func) {
        this.controlBusListeners.push(func);
    };
    BusController.prototype.listenToDataBus = function (func) {
        this.dataBusListeners.push(func);
    };
    return BusController;
}());
exports.BusController = BusController;
