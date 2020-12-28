"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const BotHandler_1 = __importDefault(require("../BotHandler"));
const _1 = __importDefault(require("."));
const stuff_1 = require("../utils/stuff");
class CommandHandler extends BotHandler_1.default {
    constructor(client, options) {
        super(client, {
            dir: options.dir,
            extensions: ['.js', '.ts'],
            moduleHandle: _1.default,
        });
        this.prefix =
            typeof options.prefix === 'function'
                ? options.prefix.bind(this)
                : options.prefix;
        this.ignoreCooldown =
            typeof options.ignoreCooldown === 'function'
                ? options.ignoreCooldown.bind(this)
                : options.ignoreCooldown;
        this.ignorePerms =
            typeof options.ignorePerms === 'function'
                ? options.ignorePerms.bind(this)
                : options.ignorePerms;
        this.defaultCooldowns = options.defaultCooldowns;
        this.fetchMembers = Boolean(options.fetchMembers || false);
        this.allowMentions = Boolean(options.allowMentions || false);
        this.cacheChannels = Boolean(options.cacheChannels || true);
        this.cachePresence = Boolean(options.cachePresence || false);
        this.blockBots = Boolean(this.blockBots || false);
        this.cooldowns = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.initialize();
    }
    initialize() {
        this.client.once('ready', () => this.client.on('message', async (msg) => {
            if (msg.partial)
                await msg.fetch();
            this.handleMessage(msg);
        }));
    }
    async preload(module, filepath) {
        super.preload(module, filepath);
        try {
            module.alias.forEach((arg) => {
                if (this.aliases.has(arg.toLowerCase())) {
                    this.emit('error', 'duplicate alias was found');
                }
                this.aliases.set(arg.toLowerCase(), module.id);
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async parseCommand(msg) {
        const allowMention = await stuff_1.intoCallable(this.prefix)(msg);
        let prefixes = stuff_1.intoArray(await allowMention);
        if (allowMention && this.allowMentions) {
            const mentions = [
                `<@${this.client.user.id}>`,
                `<@!${this.client.user.id}>`,
            ];
            prefixes = [...mentions, ...prefixes];
        }
        return this.parseNext(msg, prefixes);
    }
    parseNext(msg, prefixes) {
        const lowerContent = msg.content.toLowerCase();
        const prefix = prefixes.find((e) => lowerContent.startsWith(e.toLowerCase()));
        if (!prefix)
            return {};
        const endOfPrefix = lowerContent.indexOf(prefix.toLowerCase()) + prefix.length;
        const startOfArgs = msg.content.slice(endOfPrefix).search(/\S/) + prefix.length;
        const alias = msg.content.slice(startOfArgs).split(/\s{1,}|\n{1,}/)[0];
        const command = this.modules.get(this.aliases.get(alias.toLowerCase()));
        const content = msg.content.slice(startOfArgs + alias.length + 1).trim();
        const afterPrefix = msg.content.slice(prefix.length).trim();
        if (!command) {
            return { prefix, alias, content, afterPrefix };
        }
        return { command, prefix, alias, content, afterPrefix };
    }
    async handlerPreventer(msg, cmd) {
        var _a;
        if (msg.guild && !['guild', 'both'].includes(cmd.channel))
            return true;
        if (!msg.guild && !['dm', 'both'].includes(cmd.channel))
            return true;
        if (cmd.ownerOnly && !this.client.checkOwner(msg.author)) {
            return true;
        }
        if (this.blockBots && msg.author.bot) {
            return true;
        }
        if (cmd.userPerms &&
            !((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission(cmd.userPerms)) &&
            !stuff_1.intoArray(await stuff_1.intoCallable(this.ignorePerms)(msg)).includes(msg.author.id)) {
            return true;
        }
    }
    async handleMessage(msg) {
        if (this.fetchMembers && msg.guild && !msg.member && !msg.webhookID) {
            msg.guild.members.fetch(msg.author);
        }
        const result = await this.parseCommand(msg);
        if (result.command) {
            msg.content = result.content;
            if ((await this.handlerPreventer(msg, result.command)) === true)
                return;
            if ((await this.runCooldowns(msg, result.command)) === true)
                return;
            await this.runCommand(msg, result.command);
            this.handleCached(msg);
        }
    }
    handleCached(msg) {
        var _a, _b, _c;
        if (this.cacheChannels === false) {
            let connections = this.client.voice
                ? this.client.voice.connections.map((t) => t.channel.id)
                : [];
            this.client.channels.cache.sweep((t) => !connections.includes(t.id));
        }
        if (this.cacheChannels === false) {
            (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.delete(msg.channel.id);
        }
        if (this.cachePresence === false) {
            (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.presences.cache.delete(msg.author.presence.userID);
        }
        if (this.fetchMembers === false) {
            (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.members.cache.delete(msg.author.id);
        }
    }
    async runCommand(msg, cmd) {
        if (cmd.typing)
            msg.channel.startTyping();
        try {
            const before = cmd.prerun(msg);
            typeof before.then === 'function' &&
                typeof before.catch === 'function' &&
                (await before);
            if (before === false)
                return;
            cmd.run(msg, this.modules, msg.content.toLowerCase());
        }
        finally {
            if (cmd.typing)
                msg.channel.stopTyping();
        }
    }
    async runCooldowns(message, command) {
        var _a;
        const ignorer = command.ignoreCooldown || this.ignoreCooldown;
        const isIgnored = Array.isArray(ignorer)
            ? ignorer.includes(message.author.id) || ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(ignorer))
            : typeof ignorer === 'function'
                ? ignorer(message)
                : message.author.id === ignorer;
        if (isIgnored)
            return false;
        if (!this.defaultCooldowns)
            return false;
        const time = command.cooldown || this.defaultCooldowns;
        const endTime = message.createdTimestamp + time;
        const id = message.author.id;
        if (!this.cooldowns.has(id))
            this.cooldowns.set(id, {});
        if (!this.cooldowns.get(id)[command.id]) {
            this.cooldowns.get(id)[command.id] = {
                timer: this.client.setTimeout(() => {
                    if (this.cooldowns.get(id)[command.id]) {
                        this.client.clearTimeout(this.cooldowns.get(id)[command.id].timer);
                    }
                    this.cooldowns.get(id)[command.id] = null;
                    if (!Object.keys(this.cooldowns.get(id)).length) {
                        this.cooldowns.delete(id);
                    }
                }, time),
                end: endTime,
                uses: 0,
            };
        }
        const entry = this.cooldowns.get(id)[command.id];
        if (entry && entry.uses >= command.limit) {
            const uses = this.cooldowns.get(message.author.id)[command.id].uses;
            this.emit('cooldown', message, command, time, uses);
            return true;
        }
        entry && entry.uses++;
        return false;
    }
}
exports.default = CommandHandler;
