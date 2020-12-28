"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Ping extends __1.default {
    constructor() {
        super('ping', {
            alias: ['ping'],
            limit: 1,
            cooldown: 1000,
            channel: 'both',
            details: {
                desc: 'Check websocket connection between api',
                usage: '<prefix> [aliases]',
                examples: ['w/ping', '@bot ping'],
            },
        });
    }
    async run(msg) {
        var _a;
        const loading = await msg.channel.send('Checking...');
        try {
            await loading.edit(`Done =^`);
        }
        finally {
            loading.edit(`Result: \`${(_a = this.client) === null || _a === void 0 ? void 0 : _a.ws.ping}ms\``);
        }
    }
}
exports.default = Ping;
