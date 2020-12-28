"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
class GuildJoin extends index_1.default {
    constructor() {
        super('guild_join', {
            emitter: 'client',
            event: 'guildCreate',
        });
    }
    async run(guild) {
        Promise.all([
            !(await this.client.db.has('guilds', { _id: guild.id })) &&
                (await this.client.db.add('guilds', {
                    _id: guild.id,
                    owner: guild.ownerID,
                }, { timestamps: true })),
        ])
            .then(() => this.client.emit('dataUpdate', guild.id, new Date().getTime(), 'joined a guild', 'bot'))
            .catch((message) => this.client.emit('errorBot', new Error(JSON.stringify({
            name: 'guild-join-event',
            author: 'bot',
            code: new Date().getTime(),
            from: process.cwd(),
            message,
        }))));
    }
}
exports.default = GuildJoin;
