"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
class Kick extends __1.default {
    constructor() {
        super('kick', {
            alias: ['kick'],
            limit: 1,
            cooldown: 7000,
            typing: true,
            userPerms: ['KICK_MEMBERS'],
            channel: 'guild',
            details: {
                desc: 'Kick a member',
                usage: '<prefix> [aliases] (member) {reason}',
                args: ['member', 'reason'],
                examples: ['w/kick @Tika', '@bot kick Tika#3313 go away ~'],
            },
        });
    }
    async run(msg) {
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
                : Promise.all([member.kick(txt)])
                    .then(async () => {
                    var _a;
                    !isSilent &&
                        member &&
                        msg.channel.send(this.NewEmbed()
                            .setDescription(`reason : \`${txt}\``)
                            .setAuthor(`member ${member.user.tag} has been kicked from the server\n `, member.user.displayAvatarURL({ dynamic: true }))
                            .setColor(this.ColorUser(msg, member.user))
                            .setFooter(`action by ${msg.author.tag}`)) &&
                        (await member.createDM())
                            .send(`${(_a = member.guild) === null || _a === void 0 ? void 0 : _a.name} : you've been kicked because \`${txt}\``)
                            .catch(() => {
                            var _a;
                            return !isSilent &&
                                msg.author
                                    .send(`${(_a = msg.guild) === null || _a === void 0 ? void 0 : _a.name} : i can't sent directly message to \`${member.user.tag}\``)
                                    .catch(() => !isSilent && console.log('gagal'));
                        });
                })
                    .catch((e) => {
                    !isSilent &&
                        msg.channel.send({
                            embed: {
                                description: `reason : \`perms of the member was higher than mine\``,
                                author: {
                                    name: `[${e.httpStatus}] ${member.user.tag} can't be kicked from this server\n `,
                                    icon_url: member.user.displayAvatarURL({ dynamic: true }),
                                },
                                color: this.ColorUser(msg, member.user),
                                footer: {
                                    text: `for ${msg.author.tag}`,
                                },
                                timestamp: new Date(),
                            },
                        });
                });
    }
}
exports.default = Kick;
