"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Info extends __1.default {
    constructor() {
        super('info', {
            alias: ['help', 'info'],
            details: {
                desc: 'Commands Helper, call it when needed',
                usage: '<prefix | @bot_mention> [aliases] {command_name} - optional',
                examples: ['!help ping', '@bot info purge'],
            },
            limit: 1,
            cooldown: 10000,
            channel: 'both',
        });
    }
    async run(msg, help) {
        var _a, _b, _c;
        msg.content = msg.content.trim();
        if (!msg.content)
            return;
        let cmd = help.get(msg.content);
        cmd &&
            msg.channel.send(this.NewEmbed()
                .setTitle(`${cmd.id} command`)
                .setColor((_b = (_a = msg.member) === null || _a === void 0 ? void 0 : _a.roles.color) === null || _b === void 0 ? void 0 : _b.hexColor)
                .setThumbnail((_c = this.client) === null || _c === void 0 ? void 0 : _c.user.avatarURL({ dynamic: true }))
                .setDescription(`>>> ${cmd.details.desc}`)
                .addFields({
                name: `cooldown`,
                value: `\`${new Date(cmd.cooldown || 3000).getSeconds()} seconds\``,
                inline: true,
            }, {
                name: `uses`,
                value: `\`${cmd.limit}\``,
                inline: true,
            }, {
                name: `usage`,
                value: `\`${cmd.details.usage}\``,
                inline: true,
            }, {
                name: `aliases`,
                value: '```' + cmd.alias + '```',
            }, {
                name: `examples`,
                value: '```' + cmd.details.examples + '```',
            })
                .setFooter(`requested by ${msg.author.username}`));
    }
}
exports.default = Info;
