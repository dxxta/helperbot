"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
class Todo extends __1.default {
    constructor() {
        super('todo', {
            alias: ['todo'],
            limit: 1,
            cooldown: 30000,
            userPerms: ['ADMINISTRATOR'],
            details: {
                desc: 'Makes the bot to do something awesome\n`use {member} instead member` in a command\n`! in the front of an id` for mark this as a role(id)\n`prefix &` for mark this as a msg(id)\n`prefix #`, mark this as a channel(id)',
                usage: '<prefix> [aliases] (flags as events) (options by each flag)',
                examples: [
                    'w/todo on.join w/roles add &790911248681271297 {member}',
                    'w/todo on.react *790911246462877696 w/roles set &790911248681271297 {member} &79091124868127',
                    'w/todo on.leave w/say #79091124646280340 have a nice day :(',
                    'w/todo on.say hentai, w/warn {member} pls dont',
                ],
                args: ['flags'],
                flags: ['on.join', 'on.react', 'on.say'],
            },
        });
    }
    async run(msg) {
        var _a, _b, _c, _d, _e, _f, _g;
        let [flags, content] = await this.resolveArgue([
            {
                match: 'flag',
                flag: ['on.join', 'on.react', 'on.leave', 'on.say'],
                default: undefined,
            },
            {
                match: 'text',
                default: (msg) => msg.content,
            },
        ], msg);
        try {
            if (!flags) {
                msg.id = String(msg.id + 'new');
                msg.content = `${(_a = this.client) === null || _a === void 0 ? void 0 : _a.persist.get(msg.guild.id).prefix}help ${this.id}`;
                (_b = this.client) === null || _b === void 0 ? void 0 : _b.emit('message', msg);
                return;
            }
            else {
                String(content)
                    .split(/\s+/)
                    .forEach((e) => {
                    const match = e.match(/^(&|!|#)\d{17,18}/g);
                    if (match) {
                        content =
                            match &&
                                String(content).replace(match[0], match[0].includes('&') ? `<@${e}>` : `<${e}>`);
                    }
                });
                console.log(content);
                let checker;
                if (flags === 'on.join') {
                    checker = (_c = this.client) === null || _c === void 0 ? void 0 : _c.db.get('todo', {
                        type: { $in: ['on.join', 'on.leave'] },
                    });
                    console.log(checker === null || checker === void 0 ? void 0 : checker.then((e) => e === null || e === void 0 ? void 0 : e.count));
                }
                else if (flags === 'on.leave') {
                }
                else if (flags === 'on.react') {
                }
                else if (flags === 'on.say') {
                }
                await this.client.db.setOne('todo', { values: content }, {
                    $set: {
                        guild: (_d = msg.guild) === null || _d === void 0 ? void 0 : _d.id,
                        type: flags,
                        values: content,
                        author: msg.author,
                    },
                }, { timestamps: true, upsert: true });
                msg.channel.send({
                    embed: {
                        title: ':white_check_mark: Successfully added',
                        color: this.ColorUser(msg, msg.author),
                        description: `when ${flags.split('.')[1]}, run :\n\`\`\`${content}\`\`\``,
                        timestamp: new Date(),
                        footer: {
                            text: `added by ${msg.author.tag}`,
                        },
                    },
                });
            }
        }
        catch (message) {
            (_e = this.client) === null || _e === void 0 ? void 0 : _e.emit('errorBot', new Error(JSON.stringify({
                name: 'todo-command',
                author: msg.author.tag,
                guild: (_f = msg.guild) === null || _f === void 0 ? void 0 : _f.id,
                code: new Date().getTime(),
                from: process.cwd(),
                message,
            })), (_g = msg.guild) === null || _g === void 0 ? void 0 : _g.id);
        }
    }
}
exports.default = Todo;
