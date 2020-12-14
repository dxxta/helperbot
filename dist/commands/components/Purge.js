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
                desc: 'Delete messages based on limit [max: 100]',
                usage: '<prefix | @bot_mention> [aliases] (limit)',
                examples: ['!purge 5', '@bot purge 100'],
            },
            channel: 'guild',
            userPerms: ['MANAGE_MESSAGES'],
            cooldown: 15000,
        });
    }
    async run(msg) {
        let check = msg.content.split(' ');
        check = check.find((e) => Number(e));
        !check &&
            msg.channel
                .send(this.NewEmbed()
                .setTitle(':no_entry: This command need a value !')
                .setColor(`RED`))
                .then((e) => e.delete({ timeout: 5000, reason: 'warn' }));
        await msg.delete();
        try {
            check &&
                (await msg.channel.messages.channel.bulkDelete(check > 100 ? 100 : check, true));
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Purge;
