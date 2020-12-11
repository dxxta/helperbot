import { config } from "dotenv";
import { BotClient } from "./BotClient";
config();

const client: BotClient = new BotClient(
  { ownerID: process.env.OWNER as string, token: process.env.TOKEN as string },
  { partials: ["MESSAGE", "CHANNEL", "REACTION"] }
);
client.once("ready", () => {
  console.log("im ready");
});
client.ready();
