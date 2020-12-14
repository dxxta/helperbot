"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const Handler_1 = __importDefault(require("./commands/Handler"));
const Handler_2 = __importDefault(require("./events/Handler"));
dotenv_1.config();
class BotClient extends discord_js_1.Client {
    constructor(config, options) {
        super(options);
        this.commandHandler = new Handler_1.default(this, {
            dir: path_1.join(__dirname, 'commands/components'),
            prefix: '?',
            defaultCooldowns: 3000,
            allowMentions: true,
            fetchMembers: true,
            cacheChannels: false,
            cachePresence: false,
            cacheUsers: false,
            ignorePerms: '565906486996500510',
        });
        this.eventHandler = new Handler_2.default(this, {
            dir: path_1.join(__dirname, 'events/components'),
        });
        this.persist = new Map();
        this.config = config;
    }
    checkOwner(user) {
        const id = typeof user === 'string' ? user : this.users.resolveID(user);
        return Array.isArray(this.config.ownerID) && id
            ? this.config.ownerID.includes(id)
            : Boolean(id === this.config.ownerID);
    }
    async init() {
        this.eventHandler.setEmitters({
            commandHandler: this.commandHandler,
            eventHandler: this.eventHandler,
        });
        await this.commandHandler.loadAll();
        await this.eventHandler.loadAll();
    }
    async ready() {
        await this.init();
        await this.login(this.config.token);
    }
}
exports.default = BotClient;
new BotClient({ ownerID: process.env.OWNER, token: process.env.TOKEN }, { partials: ['MESSAGE', 'CHANNEL', 'REACTION'], messageCacheMaxSize: 50 }).ready();
