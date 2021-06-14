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
const Mongo_1 = __importDefault(require("./repositories/database/Mongo"));
dotenv_1.config();
class BotClient extends discord_js_1.Client {
    constructor(config, options) {
        super(options);
        this.db = new Mongo_1.default('mongodb://127.0.0.1/my_database', {
            dir: path_1.join(__dirname, 'repositories/mongodb'),
        });
        this.commandHandler = new Handler_1.default(this, {
            dir: path_1.join(__dirname, 'commands/components'),
            prefix: async (msg) => msg.guild && (await this.db.has('guilds', { _id: msg.guild.id }))
                ? await this.db
                    .getById('guilds', msg.guild.id)
                    .then((e) => e === null || e === void 0 ? void 0 : e.get('prefix'))
                : 'w/',
            defaultCooldowns: 3000,
            blockBots: true,
            allowMentions: true,
            fetchMembers: true,
            ignorePerms: '852580266526638151',
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
        await this.db.load();
        await this.db.getAll('guilds').then((e) => {
            if (e && e.length > 0)
                for (let i of e.values()) {
                    this.persist.set(i.id, i);
                }
        });
        this.eventHandler.setEmitters({
            commandHandler: this.commandHandler,
            eventHandler: this.eventHandler,
            dataHandler: this.db,
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
