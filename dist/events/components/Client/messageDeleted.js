"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
class MessageDelete extends index_1.default {
    constructor() {
        super('msgdelete', {
            emitter: 'client',
            event: 'messageDelete',
        });
    }
    async run(msg) {
        var _a, _b, _c, _d;
        if (!msg.partial) {
            if ((_a = this.client) === null || _a === void 0 ? void 0 : _a.persist.has(msg.channel.id)) {
                (_b = this.client) === null || _b === void 0 ? void 0 : _b.persist.delete(msg.channel.id);
            }
            !((_c = this.client) === null || _c === void 0 ? void 0 : _c.persist.has(msg.channel.id)) && ((_d = this.client) === null || _d === void 0 ? void 0 : _d.persist.set(msg.channel.id, msg));
        }
    }
}
exports.default = MessageDelete;
