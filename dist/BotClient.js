"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
dotenv_1.config();
class BotClient extends discord_js_1.Client {
    constructor(config, options) {
        super(options);
        this.persist = new Map();
        this.config = config;
    }
    checkOwner(user) {
        const id = typeof user === "string" ? user : this.users.resolveID(user);
        return Array.isArray(this.config.ownerID) && id
            ? this.config.ownerID.includes(id)
            : Boolean(id === this.config.ownerID);
    }
    async ready() {
        await this.login(this.config.token);
    }
}
exports.BotClient = BotClient;
new BotClient({ ownerID: process.env.OWNER, token: process.env.TOKEN }, { partials: ["MESSAGE", "CHANNEL", "REACTION"] })
    .once("ready", () => {
    console.log("im ready");
})
    .ready();
