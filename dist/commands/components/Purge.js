"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Purge extends __1.default {
    constructor() {
        super('purge', {
            alias: ['purge'],
            details: {
                desc: "Purge messages based on limit [max: 100]\n`make sure` you dont put the limit to 100 up\n`an old message` can`t be deleted if it's older than 14 days",
                usage: '<prefix> [aliases] (limit)',
                args: ['limit'],
                examples: ['w/purge 5', '@bot purge 100'],
            },
            userPerms: ['MANAGE_MESSAGES'],
            cooldown: 15000,
        });
    }
    async run(msg) {
        let [limit] = await this.resolveArgue([
            {
                match: 'number',
                default: undefined,
            },
        ], msg);
        !limit &&
            msg.channel
                .send({
                embed: {
                    description: ':no_entry: this command needed a value',
                    color: `RED`,
                },
            })
                .then((e) => e.delete({ timeout: 5000, reason: 'warn' }));
        try {
            limit++;
            limit &&
                (await msg.channel.messages.channel
                    .bulkDelete(limit > 100 ? 100 : limit)
                    .catch(() => {
                    throw new Error(':watch: cannot purge messages older than 14 days');
                }));
        }
        catch (message) {
            msg.channel.send({
                content: msg.author,
                embed: {
                    description: String(message),
                    color: `RED`,
                },
            });
        }
    }
}
exports.default = Purge;
