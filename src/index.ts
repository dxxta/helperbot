import { ShardingManager } from "discord.js";
import { join } from "path";
import { config } from "dotenv";
config();
const manager = new ShardingManager(join(__dirname, "BotOne", "index.ts"), {
  token: process.env.TOKEN,
  totalShards: "auto",
});

manager.on("shardCreate", (shard: any) =>
  console.log(`Launched shard ${shard.id}`)
);
manager.spawn(manager.totalShards, 10000);
