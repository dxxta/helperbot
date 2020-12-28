"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Help extends __1.default {
    constructor() {
        super('help', {
            alias: ['help'],
            details: {
                desc: 'Commands Helper, call it when needed',
                usage: '<prefix> [aliases] {command_name} - optional',
                args: ['command_name'],
                examples: ['w/help ping', '@bot help'],
            },
            limit: 5,
            cooldown: 10000,
            channel: 'both',
        });
    }
    async run(msg, help, content) {
        var _a, _b, _c, _d, _e;
        try {
            let cmd = help.get(content);
            cmd = (cmd && !cmd.ownerOnly && cmd) || undefined;
            cmd
                ? await msg.channel.send(this.NewEmbed()
                    .setTitle(`${cmd.id} command`)
                    .setColor('#ecf0f1')
                    .setDescription(`>>> ${cmd.details.desc}`)
                    .addFields({
                    name: `uses`,
                    value: `\`${cmd.limit}\``,
                    inline: true,
                }, {
                    name: `cooldown`,
                    value: `\`${new Date(cmd.cooldown || 3000).getSeconds()} seconds\``,
                    inline: true,
                }, {
                    name: `usage`,
                    value: `\`${cmd.details.usage}\``,
                }, {
                    name: `permissions`,
                    value: `\`${cmd.userPerms || 'EVERYONE'}\``,
                }, {
                    name: `aliases`,
                    value: `${cmd.alias.map((e) => ` \`${e}\``)}`,
                }, {
                    name: `arguments`,
                    value: `${((_a = cmd.details.args) === null || _a === void 0 ? void 0 : _a.map((e) => ` \`${e}\``)) || 'none'}`,
                }, {
                    name: `flags`,
                    value: `${((_b = cmd.details.flags) === null || _b === void 0 ? void 0 : _b.map((e) => ` \`${e}\``)) || 'none'}`,
                }, {
                    name: `examples`,
                    value: `${((_c = cmd.details.examples) === null || _c === void 0 ? void 0 : _c.map((e) => `-> \`${e}\`\n`).join(' ')) || 'none'}`,
                })
                    .setFooter(`requested by ${msg.author.username}`))
                : await msg.channel.send(this.NewEmbed()
                    .setTitle(`Command List`)
                    .setColor('#ecf0f1')
                    .setDescription(`>>> you're currently at ${(_d = msg.guild) === null || _d === void 0 ? void 0 : _d.name} guild\nglobal prefix : \` w/ \`\n-> prefix on this guild : \` ${(_e = this.client) === null || _e === void 0 ? void 0 : _e.persist.get(msg.guild.id).prefix} \`\n--> use \` <prefix> help {command} \`   instead`)
                    .addField('commands', Array(help
                    .filter((e) => !e.ownerOnly)
                    .map((e) => `\t\`${e.id}\``)).join(' '), true)
                    .setFooter(`requested by ${msg.author.username}`));
        }
        catch (error) {
            msg.channel.send({
                content: msg.author,
                embed: {
                    description: String(error),
                    color: `RED`,
                },
            });
        }
    }
}
exports.default = Help;
