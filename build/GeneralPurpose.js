"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralPurpose = void 0;
var Register_1 = require("./Register");
var Logger_1 = require("./utils/Logger");
var opcode_1 = require("./utils/opcode");
var GeneralPurpose = /** @class */ (function (_super) {
    __extends(GeneralPurpose, _super);
    function GeneralPurpose(_a) {
        var friendlyName = _a.friendlyName, BUS = _a.BUS;
        var _this = _super.call(this, friendlyName) || this;
        _this.BUS = BUS;
        _this.start();
        return _this;
    }
    GeneralPurpose.prototype.start = function () {
        var _this = this;
        this.BUS.listenToControlBus(function (data) {
            var _a = (0, opcode_1.OpcodeSeparator)(data), opcode = _a.opcode, operand = _a.operand;
            if (opcode === 11) {
                (0, Logger_1.Logger)("Setting data bus to GP value");
                _this.BUS.hardCodeControlBus(2, operand);
                var val = _this.BUS.getDataBus();
                _this.setValue(val);
            }
            if (opcode === 12) {
                (0, Logger_1.Logger)("Setting data bus to GP value");
                _this.BUS.setDataBus(_this.getValue());
                _this.BUS.hardCodeControlBus(1, operand);
            }
            if (opcode === 9) {
                (0, Logger_1.Logger)("Setting GP value to: " + operand);
                _this.setValue(operand);
            }
        });
    };
    return GeneralPurpose;
}(Register_1.Register));
exports.GeneralPurpose = GeneralPurpose;
