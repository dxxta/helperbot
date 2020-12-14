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
                desc: 'Sniping into channel ~sssttt',
                usage: '<prefix | @bot_mention> [aliases]',
                examples: ['!sneak', '@bot s'],
            },
            channel: 'guild',
            limit: 3,
        });
    }
    async run(msg) {
        var _a;
        const check = (_a = this.client) === null || _a === void 0 ? void 0 : _a.persist.get(msg.channel.id);
        const image = check.attachments.first();
        check &&
            msg.channel.send(this.NewEmbed()
                .setAuthor(check.author.username, check.author.displayAvatarURL({ dynamic: true }))
                .setImage((image === null || image === void 0 ? void 0 : image.proxyURL) || (image === null || image === void 0 ? void 0 : image.attachment))
                .setDescription(check.content || check.cleanContent)
                .setColor(this.ColorUser(msg, msg.author)));
    }
}
exports.default = Sneak;
