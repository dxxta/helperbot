"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Sneak extends __1.default {
    constructor() {
        super('sneak', {
            alias: ['sneak', 's'],
            details: {
                desc: 'Sniping channels ~sssttt',
                usage: '<prefix> [aliases]',
                examples: ['w/sneak', '@bot s'],
            },
            limit: 3,
        });
    }
    async run(msg) {
        var _a, _b, _c;
        const check = (_a = this.client) === null || _a === void 0 ? void 0 : _a.persist.get(msg.channel.id);
        const image = check && check.attachments.first();
        try {
            if (!check || (check && !check.content && !image)) {
                ;
                (await msg.reply('There is nothing to do')).delete({
                    timeout: 5000,
                });
            }
            else {
                msg.channel.send(this.NewEmbed()
                    .setAuthor(check.author.username, check.author.displayAvatarURL({ dynamic: true }))
                    .setImage((image === null || image === void 0 ? void 0 : image.proxyURL) || (image === null || image === void 0 ? void 0 : image.attachment))
                    .setDescription(check.content || check.cleanContent)
                    .setColor(this.ColorUser(msg, msg.author)));
            }
        }
        catch (message) {
            this.client.emit('errorBot', new Error(JSON.stringify({
                name: 'sneak-command',
                author: msg.author.tag,
                guild: (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id,
                code: new Date().getTime(),
                from: process.cwd(),
                message,
            })), (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.id);
        }
    }
}
exports.default = Sneak;
