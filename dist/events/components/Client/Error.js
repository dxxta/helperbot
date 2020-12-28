"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
class Error extends index_1.default {
    constructor() {
        super('error', {
            emitter: 'client',
            event: 'errorBot',
        });
    }
    async run(error, guildID) {
        var _a;
        return;
        await ((_a = this.client) === null || _a === void 0 ? void 0 : _a.db.setOne('logs', { _id: guildID }, {
            $push: {
                error,
            },
        }, {
            upsert: true,
        }));
    }
}
exports.default = Error;
