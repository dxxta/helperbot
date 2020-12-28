"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
class Warn extends __1.default {
    constructor() {
        super('warn', {
            alias: ['warn'],
            limit: 1,
            cooldown: 5000,
            typing: true,
            userPerms: ['MANAGE_MESSAGES', 'MANAGE_NICKNAMES'],
            channel: 'guild',
            details: {
                desc: 'Warn a member',
                usage: '<prefix> [aliases] (member) {reason}',
                args: ['member', 'reason'],
                examples: ['w/warn @Tika', '@bot warn Tika#3313 stop spamming'],
            },
        });
    }
    async run(msg) {
        var _a, _b, _c;
        const [isSilent, member, txt] = await this.resolveArgue([
            {
                match: 'flag',
                flag: ['silent'],
                default: undefined,
            },
            {
                match: 'member',
                default: false,
            },
            {
                match: 'text',
                default: () => `something`,
            },
        ], msg);
        try {
            !member
                ? !isSilent &&
                    (await msg.reply({
                        embed: {
                            description: ':no_entry: Please put a member, also the reason as you want',
                            color: `RED`,
                        },
                    })).delete({ timeout: 5000 })
                : member && member.user.id === msg.author.id
                    ? !isSilent &&
                        (await msg.reply(`For real you can't do it for your self `)).delete({
                            timeout: 5000,
                        })
                    : !isSilent &&
                        msg.channel.send(this.NewEmbed()
                            .setDescription(`reason : \`${txt}\``)
                            .setAuthor(`member ${member.user.tag} has been warned from the server\n `, member.user.displayAvatarURL({ dynamic: true }))
                            .setColor(this.ColorUser(msg, member.user))
                            .setFooter(`action by ${msg.author.tag}`));
            member &&
                member.user.id !== msg.author.id &&
                (await member.createDM())
                    .send(`${(_a = member.guild) === null || _a === void 0 ? void 0 : _a.name} : you've been warned because \`${txt}\``)
                    .catch(() => {
                    var _a;
                    return msg.author
                        .send(`${(_a = msg.guild) === null || _a === void 0 ? void 0 : _a.name} : i can't sent directly message to \`${member.user.tag}\``)
                        .catch(() => this.client.emit('error', new Error(JSON.stringify({
                        name: 'guild-join-event',
                        code: new Date().getTime(),
                        from: process.cwd(),
                        message: `${msg.author.tag} was strict him direct messages`,
                    }))));
                });
        }
        catch (message) {
            this.client.emit('errorBot', new Error(JSON.stringify({
                name: 'warn-command',
                author: msg.author.tag,
                guild: (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id,
                code: new Date().getMilliseconds(),
                from: process.cwd(),
                message,
            })), (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.id);
        }
    }
}
exports.default = Warn;
