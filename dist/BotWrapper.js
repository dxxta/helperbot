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
}
exports.default = Wrapper;
