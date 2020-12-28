"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const stuff_1 = require("./utils/stuff");
class Wrapper {
    constructor(id) {
        this.id = id;
        this.client = null;
    }
    NewEmbed() {
        return new discord_js_1.MessageEmbed().setTimestamp();
    }
    resolveUser(text, users) {
        return users.get(text) || users.find((user) => this.checkUser(text, user));
    }
    resolveUsers(text, users) {
        return users.filter((user) => this.checkUser(text, user));
    }
    checkUser(text, user) {
        if (user.id === text)
            return true;
        const reg = /<@!?(\d{17,19})>/;
        const match = text.match(reg);
        if (match && user.id === match[1])
            return true;
        const data = {
            name: [user.username],
            discrim: user.discriminator,
        };
        return Boolean(data.name.includes(text) ||
            (data.name.includes(text.split('#')[0]) &&
                data.discrim.includes(text.split('#')[1])));
    }
    resolveMember(text, msg) {
        const members = msg.guild.members.cache;
        return (members.get(text) ||
            members.find((member) => this.checkMember(text, member)));
    }
    ColorUser(msg, user) {
        var _a, _b, _c;
        return msg && ((_c = (_b = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.member(user)) === null || _b === void 0 ? void 0 : _b.roles.color) === null || _c === void 0 ? void 0 : _c.hexColor);
    }
    checkMember(text, member) {
        var _a;
        if (member.id === text)
            return true;
        const reg = /<@!?(\d{17,19})>/;
        const match = text.match(reg);
        if (match && member.id === match[1])
            return true;
        const data = {
            name: [
                member.user.username.toLowerCase(),
                member.displayName.toLowerCase(),
                (_a = member.nickname) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
                member.user.username,
                member.displayName,
                member.nickname,
            ],
            discrim: [member.user.discriminator],
        };
        return Boolean(text
            .split(/\s+/)
            .find((e) => data.name.includes(e) ||
            (data.name.includes(e.toLowerCase().split('#')[0]) &&
                data.discrim.includes(e.split('#')[1]))));
    }
    resolveAsc(a, b) {
        if (a.rawPosition < b.rawPosition)
            return 1;
        if (a.rawPosition > b.rawPosition)
            return -1;
        return 0;
    }
    resolveRole(text, msg) {
        const roles = msg.guild.roles.cache;
        return roles.get(text) || roles.find((role) => this.checkRoles(text, role));
    }
    resolveChannel(text, msg) {
        const channels = msg.guild.channels.cache;
        return (channels.get(text) ||
            channels.find((channel) => this.checkChannels(text, channel)));
    }
    checkRoles(text, roles) {
        if (roles.id === text)
            return true;
        let match = /<#(\d{17,18})>/;
        match = text.match(match);
        if (match && match[1] === roles.id)
            return true;
        const last = roles.name.toLowerCase();
        return Boolean(roles.name === text || last === text || last === text.toLowerCase());
    }
    checkChannels(text, channel) {
        if (channel.id === text)
            return true;
        let match = /<#\d{17,18}>/;
        match = text.match(match);
        if (match && match[1] === channel.id)
            return true;
        const last = channel.name.toLowerCase();
        return Boolean(channel.name === text || last === text || last === text.toLowerCase());
    }
    reSort(data, page, total) {
        const end = total * page;
        return data.slice(end - total, end);
    }
    async resolveArgue(args, msg, separator = /\s{1,}|\n{1,}/) {
        var _a;
        let index = 0;
        let content = msg.content.toLowerCase().slice(index).trim();
        separator =
            typeof separator === 'function'
                ? Function(separator).bind(this)
                : separator;
        for (let i = 0; i < args.length; i++) {
            let match;
            content = content.toLowerCase().slice(index).trim();
            const splited = content.split(separator);
            const defaults = typeof args[i].default === 'function'
                ? await stuff_1.intoCallable(args[i].default)(msg)
                : args[i].default;
            if (args[i].match === 'flag') {
                match = (_a = args[i].flag) === null || _a === void 0 ? void 0 : _a.find((e) => content.match(e));
                args[i].default = match ? match : defaults;
                index = match ? content.indexOf(match) + match.length : 0;
            }
            else if (args[i].match === 'number') {
                match = content.match(/\d+/);
                args[i].default = match ? match[0] : defaults;
                index = match ? Number(match.index + match[0].length) : 0;
            }
            else if (args[i].match === 'member') {
                match = splited.find((e) => this.resolveMember(e, msg));
                args[i].default = match ? this.resolveMember(match, msg) : defaults;
                index = match ? Number(content.indexOf(match) + match.length) : 0;
            }
            else if (args[i].match === 'role') {
                match = splited.find((e) => this.resolveRole(e, msg));
                args[i].default = match ? this.resolveRole(match, msg) : defaults;
                index = match ? Number(content.indexOf(match) + match.length) : 0;
            }
            else if (args[i].match === 'channel') {
                match = splited.find((e) => this.resolveChannel(e, msg));
                args[i].default = match ? this.resolveChannel(match, msg) : defaults;
                index = match ? Number(content.indexOf(match) + match.length) : 0;
            }
            else if (args[i].match === 'text') {
                match = content.toString();
                args[i].default = match ? match : defaults;
                index = match ? Number(content.indexOf(match[0]) + match.length) : 0;
            }
            else if (args[i].match === 'endWord') {
                match = content.match(/\w+$/);
                args[i].default = match ? match[0] : defaults;
                index = match ? Number(content.indexOf(match[0]) + match.length) : 0;
            }
            else if (args[i].match === 'regex') {
                match = content.match(args[i].regex);
                args[i].default = match ? match[0] : defaults;
                index = match ? Number(content.indexOf(match[0]) + match.length) : 0;
            }
        }
        return args.map((e) => e.default);
    }
}
exports.default = Wrapper;
