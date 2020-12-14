"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
class Ready extends index_1.default {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
        });
    }
    async run(msg) {
        setInterval(async () => {
            var _a, _b, _c, _d, _e, _f;
            const status = [
                'with my boy :3',
                `on ${await ((_b = (_a = this.client) === null || _a === void 0 ? void 0 : _a.shard) === null || _b === void 0 ? void 0 : _b.broadcastEval('this.guilds.cache.size').then((r) => r.reduce((acc, guildCount) => acc + guildCount, 0)))} guilds`,
                `with ${await ((_d = (_c = this.client) === null || _c === void 0 ? void 0 : _c.shard) === null || _d === void 0 ? void 0 : _d.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)').then((r) => r.reduce((acc, memberCount) => acc + memberCount, 0)))} members`,
            ];
            (_f = (_e = this.client) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.setPresence({
                activity: {
                    name: `${status[Math.floor(Math.random() * status.length)]}`,
                    type: 'STREAMING',
                    url: 'https://www.twitch.tv/animevibesradio',
                },
                status: 'dnd',
            });
        }, 1000);
        console.log('Bot Siap');
    }
}
exports.default = Ready;
