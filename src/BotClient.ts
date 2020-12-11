import { Client, ClientOptions, UserResolvable, IClient } from "discord.js";
import { config } from "dotenv";
config();

export class BotClient extends Client implements IClient {
  persist: Map<string, any>;
  config: { ownerID: string | string[]; token: string };
  constructor(
    config: { ownerID: string; token: string },
    options?: ClientOptions
  ) {
    super(options);
    this.persist = new Map();
    this.config = config;
  }
  checkOwner(user: UserResolvable | string): boolean {
    const id = typeof user === "string" ? user : this.users.resolveID(user);
    return Array.isArray(this.config.ownerID) && id
      ? this.config.ownerID.includes(id)
      : Boolean(id === this.config.ownerID);
  }
  async ready(): Promise<void> {
    await this.login(this.config.token);
  }
}

new BotClient(
  { ownerID: process.env.OWNER as string, token: process.env.TOKEN as string },
  { partials: ["MESSAGE", "CHANNEL", "REACTION"] }
)
  .once("ready", () => {
    console.log("im ready");
  })
  .ready();
