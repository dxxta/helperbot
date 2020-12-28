"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
class Say extends __1.default {
    constructor() {
        super('say', {
            alias: ['say'],
            limit: 1,
            cooldown: 30000,
            channel: 'guild',
            details: {
                desc: 'Make the bot to say something',
                usage: '<prefix> [aliases]',
                examples: ['w/say hello!', '@bot sup dude'],
            },
        });
    }
    async run(msg) {
        try {
            msg.content &&
                (await msg.channel.send({
                    content: msg.content,
                }));
        }
        finally {
            msg.content && (await msg.delete());
        }
    }
}
exports.default = Say;
