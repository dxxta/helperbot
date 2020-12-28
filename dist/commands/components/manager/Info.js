"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
class Bot extends __1.default {
    constructor() {
        super('bot', {
            alias: ['bot'],
            limit: 1,
            cooldown: 1000,
            channel: 'both',
            details: {
                desc: 'Bot informations',
                usage: '<prefix> [aliases] {flags}',
                examples: ['w/bot stats', 'w/bot invite'],
                args: ['flags'],
                flags: ['stats', 'invite'],
            },
        });
    }
    async run(msg) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const loading = await msg.channel.send('Fetching...');
        const [args] = await this.resolveArgue([
            {
                match: 'flag',
                flag: ['stats', 'invite'],
                default: undefined,
            },
        ], msg);
        const embed = {
            title: 'Click Here To Invite Me',
            color: `WHITE`,
            url: await ((_a = this.client) === null || _a === void 0 ? void 0 : _a.generateInvite({
                permissions: 'ADMINISTRATOR',
            })),
            description: 'Click the title to get the link of mine\nLet me join to your server to helps:)',
            thumbnail: {
                url: (_c = (_b = this.client) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.displayAvatarURL({ dynamic: true }),
            },
            timestamp: new Date(),
            footer: {
                text: `requested`,
            },
        };
        try {
            loading.edit({ content: msg.author });
            if (args && args === 'invite') {
                loading.edit({ embed });
            }
            else {
                msg.id = String(msg.id + 'new');
                msg.content = `${(_d = this.client) === null || _d === void 0 ? void 0 : _d.persist.get(msg.guild.id).prefix}help ${this.id}`;
                (_e = this.client) === null || _e === void 0 ? void 0 : _e.emit('message', msg);
            }
        }
        catch (message) {
            (_f = this.client) === null || _f === void 0 ? void 0 : _f.emit('errorBot', new Error(JSON.stringify({
                name: 'bot_info',
                author: msg.author.tag,
                guild: (_g = msg.guild) === null || _g === void 0 ? void 0 : _g.id,
                code: new Date().getTime(),
                from: process.cwd(),
                message,
            })), (_h = msg.guild) === null || _h === void 0 ? void 0 : _h.id);
        }
    }
}
exports.default = Bot;
