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
            channel: 'both',
            details: {
                desc: 'Showing avatar of author or selected member',
                usage: '<prefix> [aliases] {member} - optional',
                args: ['member'],
                examples: ['w/av @tika#3313', '@bot avatar', 'w/avatar'],
            },
            typing: true,
        });
    }
    async run(msg) {
        const message = await msg.channel.send(`Generating avatar...`);
        const [result] = await this.resolveArgue([
            {
                match: 'member',
                default: (message) => message.member,
            },
        ], msg);
        msg.channel.send({
            embed: this.NewEmbed()
                .setTitle(`${result.user.tag} avatar`)
                .setColor(this.ColorUser(msg, result.user))
                .setURL(result.user.avatarURL({ dynamic: true }))
                .setImage(result.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setFooter(`requested by ${msg.author.username}`),
        });
        message.delete();
    }
}
exports.default = Avatar;
