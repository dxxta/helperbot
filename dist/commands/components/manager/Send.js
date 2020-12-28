"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const canvas_1 = require("canvas");
const path_1 = require("path");
const __1 = __importDefault(require("../.."));
canvas_1.registerFont(path_1.join(process.cwd(), 'assets/Poppins-Bold.ttf'), {
    family: 'Poppins',
});
class Send extends __1.default {
    constructor() {
        super('send', {
            alias: ['send'],
            limit: 1,
            cooldown: 10000,
            userPerms: ['ADMINISTRATOR'],
            details: {
                desc: 'Makes the bot sending an image/embed/message through dm / channel\n`embed`: send an embed to dm/channel\n`pict`: send edited picture to dm/channel\nembed & pict are optional,if not defined will send a message as text',
                usage: '<prefix> [aliases] (flags dm/channel) {flags embed/pict}',
                examples: [],
                args: ['flags', 'member'],
                flags: ['dm', 'channel', 'embed', 'pict'],
            },
        });
    }
    async embed(channel, content, author) {
        if (!content)
            return;
        const embed = {
            title: Object(content).title,
            url: Object(content).url,
            color: Object(content).color || '#ecf0f1',
            description: Object(content).description,
            image: {
                url: Object(content).image && String(Object(content).image),
            },
            thumbnail: {
                url: Object(content).thumbnail && String(Object(content).thumbnail),
            },
            footer: {
                text: Object(content).footer && String(Object(content).footer),
            },
        };
        return channel.send({
            content: author,
            embed,
        });
    }
    async pict(channel, msg, content) {
        var _a;
        const canvas = canvas_1.createCanvas(700, 400);
        const ctx = canvas.getContext('2d');
        const background = await canvas_1.loadImage(Object(content).image || path_1.join(process.cwd(), 'assets/null.png'));
        ctx.filter = 'url(#gaussian)';
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = `${Object(content).title.size || '50'}px Poppins`;
        ctx.fillStyle = Object(content).title.color || '#ecf0f1';
        ctx.textBaseline = 'middle';
        ctx.textAlign = Object(content).title.align || 'center';
        ctx.fillText(Object(content).title.text || 'undefined', canvas.width / (Object(content).title.x || 2), canvas.height / (Object(content).title.y || 1.5));
        ctx.strokeStyle = '#ecf0f1';
        ctx.strokeStyle = Object(content).title.stroke;
        ctx.strokeText(Object(content).title.text || 'undefined', canvas.width / (Object(content).title.x || 2), canvas.height / (Object(content).title.y || 1.5));
        ctx.font = `${Object(content).description.size || '40'}px Poppins`;
        ctx.fillStyle = Object(content).description.color || '#ecf0f1';
        ctx.textBaseline = 'middle';
        ctx.textAlign = Object(content).description.align || 'center';
        ctx.fillText(Object(content).description.text || 'undefined', canvas.width / (Object(content).description.x || 2), canvas.height / (Object(content).description.y || 1.2));
        ctx.strokeStyle = '#ecf0f1';
        ctx.strokeStyle = Object(content).description.stroke;
        ctx.strokeText(Object(content).description.text || 'undefined', canvas.width / (Object(content).description.x || 2), canvas.height / (Object(content).description.y || 1.2));
        if (Object(content).thumbnail.image.source) {
            Object(content).thumbnail.image.source = await canvas_1.loadImage(String(((_a = this.resolveMember(Object(content).thumbnail.image.source, msg)) === null || _a === void 0 ? void 0 : _a.user.displayAvatarURL({ format: 'png' })) ||
                Object(content).thumbnail.image.source.replace('author', msg.author.displayAvatarURL({ format: 'png' })) ||
                msg.author.displayAvatarURL({ format: 'png' })));
            ctx.lineWidth = 15;
            ctx.beginPath();
            ctx.strokeStyle = Object(content).thumbnail.stroke;
            ctx.arc(canvas.width /
                (Number(String(Object(content).thumbnail.image.x).match(/\w{1,}/g)[0]) || 2), canvas.height /
                (Number(String(Object(content).thumbnail.image.y).match(/\w{1,}/g)[0]) || 3), 100, 0, Math.PI * 2, true);
            Object(content).thumbnail.stroke && ctx.stroke();
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(Object(content).thumbnail.image.source, canvas.width /
                (Number(String(Object(content).thumbnail.image.x).match(/\w{1,}/g)[0]) || 3), canvas.height /
                (Number(String(Object(content).thumbnail.image.y).match(/\w{1,}/g)[0]) || 12), 225, 225);
        }
        const attachments = new discord_js_1.MessageAttachment(canvas.toBuffer(), 'edited-pict.png');
        await channel.send(attachments);
        return;
    }
    async run(msg) {
        var _a, _b, _c, _d;
        let [isSilent, channel, member, type, content] = await this.resolveArgue([
            {
                match: 'flag',
                flag: ['silent'],
                default: undefined,
            },
            {
                match: 'channel',
                default: msg.channel,
            },
            {
                match: 'member',
                default: undefined,
            },
            {
                match: 'flag',
                flag: ['embed', 'pict'],
                default: undefined,
            },
            {
                match: 'text',
                default: undefined,
            },
        ], msg);
        try {
            if (content) {
                content = String(content).split(/\n/).join(' ');
            }
            if (!type) {
                msg.content = `w/help ${this.id}`;
                !isSilent && ((_a = this.client) === null || _a === void 0 ? void 0 : _a.emit('message', msg));
                !isSilent && (await msg.delete());
                return;
            }
            else {
                if (member && content) {
                    try {
                        const result = JSON.parse(content.trim());
                        const dm = (await member.user.createDM());
                        if (type && type === 'embed') {
                            await this.embed(dm, result, msg.author);
                        }
                        else if (type && type === 'pict') {
                            await this.pict(dm, msg, result);
                        }
                        else {
                        }
                    }
                    catch (error) {
                        if (!isSilent)
                            throw new Error(`Cannot send message to the member`);
                    }
                }
                else if (channel && content) {
                    try {
                        const result = JSON.parse(content.trim());
                        if (type && type === 'embed') {
                            await this.embed(channel, result, msg.author);
                        }
                        else if (type && type === 'pict') {
                            await this.pict(channel, msg, result);
                        }
                        else {
                        }
                    }
                    catch (error) {
                        if (!isSilent)
                            throw error;
                    }
                }
                isSilent && (await msg.delete());
            }
        }
        catch (message) {
            !isSilent &&
                (await msg.reply(`failed when ran the command: \`${message}\``)).delete({ timeout: 10000 });
            isSilent && ((_b = this.client) === null || _b === void 0 ? void 0 : _b.emit('errorBot', new Error(JSON.stringify({
                author: msg.author.tag,
                guild: (_c = msg.guild) === null || _c === void 0 ? void 0 : _c.id,
                from: process.cwd(),
                message,
            })), (_d = msg.guild) === null || _d === void 0 ? void 0 : _d.id));
        }
    }
}
exports.default = Send;
