"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
dotenv_1.config();
class Sharding extends discord_js_1.ShardingManager {
    constructor() {
        super(path_1.join(__dirname, "BotClient.js"), {
            token: process.env.TOKEN,
            totalShards: "auto",
            respawn: false,
        });
        this.init();
    }
    init() {
        this.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
    }
    run() {
        this.spawn(this.totalShards, 10000);
    }
}
new Sharding().run();
