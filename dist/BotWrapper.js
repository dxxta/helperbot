"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Wrapper {
    constructor(id) {
        this.id = id;
        this.client = null;
    }
    NewEmbed() {
        return new discord_js_1.MessageEmbed().setTimestamp();
    }
    Embed(data) {
        return new discord_js_1.MessageEmbed(data);
    }
    resolveUser(id, text, users, caseSensitive, words) {
        return (users.get(text) ||
            users.find((user) => this.checkUser(text, user, caseSensitive, words)));
    }
    resolveUsers(text, users, caseSensitive, words) {
        return users.filter((user) => this.checkUser(text, user, caseSensitive, words));
    }
    checkUser(text, user, caseSensitive, words) {
        if (user.id === text)
            return true;
        const reg = /<@!?(\d{17,19})>/;
        const match = text.match(reg);
        if (match && user.id === match[1])
            return true;
        text = caseSensitive ? text : text.toLowerCase();
        const username = caseSensitive ? user.username : user.username.toLowerCase();
        const discrim = user.discriminator;
        if (!words) {
            return (username.includes(text) ||
                (username.includes(text.split('#')[0]) &&
                    discrim.includes(text.split('#')[1])));
        }
        return (username === text ||
            (username === text.split('#')[0] && discrim === text.split('#')[1]));
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
        if (member.id === text)
            return true;
        const reg = /<@!?(\d{17,19})>/;
        const match = text.match(reg);
        if (match && member.id === match[1])
            return true;
        const data = {
            name: [member.user.username, member.displayName],
            discrim: member.user.discriminator,
        };
        return Boolean(data.name.includes(text) ||
            (data.name.includes(text.split('#')[0]) &&
                data.discrim.includes(text.split('#')[1])));
    }
    resolveArgue(separator, msg, defaults) {
        separator =
            typeof separator === 'function'
                ? Function(separator).bind(this)
                : separator;
        defaults =
            typeof defaults === 'function' ? Function(defaults).bind(this) : defaults;
        return separator ? msg.content.split(separator) : defaults;
    }
}
exports.default = Wrapper;
