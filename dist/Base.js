"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const BotClient_1 = require("./BotClient");
dotenv_1.config();
const client = new BotClient_1.BotClient({ ownerID: process.env.OWNER, token: process.env.TOKEN }, { partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.once("ready", () => {
    console.log("im ready");
});
client.ready();
