"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../"));
class Ready extends __1.default {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown',
        });
    }
    run(...args) {
        const [msg, command, time, uses] = args;
        msg.delete();
        msg.channel
            .send(this.NewEmbed()
            .setTitle(`${command.id} command was cooldown for ${new Date(time).getSeconds()} seconds`)
            .setColor(`#fe2e51`)
            .setFooter(`for ${msg.author.username}`))
            .then((e) => e.delete({ timeout: 5000 }));
    }
}
exports.default = Ready;
