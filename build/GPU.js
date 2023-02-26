"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPU = void 0;
var opcode_1 = require("./utils/opcode");
// CPU screen size 
var screensize = 28;
var GPU = /** @class */ (function () {
    function GPU(_a) {
        var BUS = _a.BUS, GPX = _a.GPX, GPY = _a.GPY, GPC = _a.GPC;
        this.BUS = BUS;
        this.REG_X = GPX;
        this.REG_Y = GPY;
        this.COL = GPC;
        this.screen = new Array(screensize).fill(0).map(function () { return new Array(screensize).fill(0); });
        this.start();
    }
    ;
    GPU.prototype.start = function () {
        var _this = this;
        this.BUS.listenToControlBus(function (data) {
            var _a = (0, opcode_1.OpcodeSeparator)(data), opcode = _a.opcode, operand = _a.operand;
            if (opcode === 1) {
                if (operand === 11) {
                    _this.REG_X.setValue(_this.BUS.getDataBus());
                }
                if (operand === 12) {
                    _this.REG_Y.setValue(_this.BUS.getDataBus());
                }
                if (operand === 13) {
                    _this.COL.setValue(_this.BUS.getDataBus());
                }
            }
        });
    };
    GPU.prototype.fetchAllData = function () {
        return this.screen;
    };
    return GPU;
}());
exports.GPU = GPU;
