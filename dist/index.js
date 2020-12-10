"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = require("path");
require("dotenv").config();
const manager = new discord_js_1.ShardingManager(
  path_1.join(__dirname, "BotOne", "index.js"),
  {
    token: process.env.TOKEN,
    totalShards: "auto",
  }
);
manager.on("shardCreate", (shard) => console.log(`Launched shard ${shard.id}`));
manager.spawn(manager.totalShards, 10000);
