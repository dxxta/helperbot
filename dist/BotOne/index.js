"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv").config();
const client = new discord_js_1.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.once("ready", () => console.log("im ready"));
client.login(process.env.TOKEN);
