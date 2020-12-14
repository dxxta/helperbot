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
            cooldown: 10000,
            details: {
                desc: 'Check websocket connection between author - bot - api',
                usage: '<prefix | @bot_mention> ping',
                examples: ['!ping', '@bot ping'],
            },
            typing: true,
        });
    }
    async run(msg) {
        var _a;
        const loading = await msg.channel.send('Checking...');
        try {
            await msg.channel.send(`Result: \`${(_a = this.client) === null || _a === void 0 ? void 0 : _a.ws.ping}ms\``);
        }
        finally {
            loading.delete();
        }
    }
}
exports.default = Ping;
