"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
class DataUpdate extends index_1.default {
    constructor() {
        super('data-update', {
            emitter: 'client',
            event: 'dataUpdate',
        });
    }
    async run(guildID, id, reason, author) {
        var _a;
        await ((_a = this.client) === null || _a === void 0 ? void 0 : _a.db.setOne('logs', { _id: guildID }, {
            $push: {
                changes: JSON.stringify({
                    id,
                    author,
                    reason,
                    type: 'update',
                }),
            },
        }, {
            upsert: true,
        }));
    }
}
exports.default = DataUpdate;
