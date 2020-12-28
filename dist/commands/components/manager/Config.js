"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
class Config extends __1.default {
    constructor() {
        super('config', {
            alias: ['config'],
            limit: 1,
            cooldown: 10000,
            userPerms: ['ADMINISTRATOR'],
            details: {
                desc: 'Bot Configurations',
                usage: '<prefix> [aliases] {flags}',
                examples: ['w/config prefix !', '@bot prefix ?'],
                args: ['flags'],
                flags: ['prefix'],
            },
        });
    }
    async run(msg) {
        var _a, _b, _c, _d, _e, _f, _g;
        const [flags, args] = await this.resolveArgue([
            {
                match: 'flag',
                flag: ['prefix'],
                default: undefined,
            },
            {
                match: 'text',
                default: undefined,
            },
        ], msg);
        const embed = {
            description: `Successfully changed prefix`,
            color: this.ColorUser(msg, msg.author),
            timestamp: new Date(),
            footer: {
                text: `action by ${msg.author.tag}`,
            },
        };
        try {
            if (flags && flags === 'prefix' && args) {
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.db.setOne('guilds', { _id: (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id }, {
                    $set: {
                        prefix: args,
                    },
                }).then(() => msg.channel.send({
                    content: 'done',
                    embed,
                }));
            }
            else {
                msg.content = `${(_c = this.client) === null || _c === void 0 ? void 0 : _c.persist.get(msg.guild.id).prefix}help ${this.id}`;
                (_d = this.client) === null || _d === void 0 ? void 0 : _d.emit('message', msg);
            }
        }
        catch (message) {
            (_e = this.client) === null || _e === void 0 ? void 0 : _e.emit('errorBot', new Error(JSON.stringify({
                name: 'bot_config',
                author: msg.author.tag,
                guild: (_f = msg.guild) === null || _f === void 0 ? void 0 : _f.id,
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            })), (_g = msg.guild) === null || _g === void 0 ? void 0 : _g.id);
        }
    }
}
exports.default = Config;
