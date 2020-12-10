import { Client } from "discord.js";
import { config } from "dotenv";
config();
const client: Client = new Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.once("ready", () => console.log("im ready"));
client.login(process.env.TOKEN);
