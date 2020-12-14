"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Avatar extends __1.default {
    constructor() {
        super('avatar', {
            alias: ['avatar', 'av'],
            limit: 1,
            cooldown: 5000,
            details: {
                desc: 'Showing avatar of author or selected member',
                usage: '<prefix | @bot_mention> [aliases] {@member} - optional',
                examples: ['!av @tika#3313', '@bot avatar', '!avatar'],
            },
            typing: true,
        });
    }
    async run(msg) {
        const message = await msg.channel.send(`Generating avatar...`);
        let result = this.resolveMember(msg.content.toString(), msg);
        result = result ? result.user : msg.author;
        msg.channel.send({
            embed: this.NewEmbed()
                .setTitle(`${result.username} avatar`)
                .setColor(this.ColorUser(msg, result))
                .setURL(result.avatarURL({ dynamic: true }))
                .setImage(result.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setFooter(`requested by ${msg.author.username}`),
        });
        message.delete();
    }
}
exports.default = Avatar;
