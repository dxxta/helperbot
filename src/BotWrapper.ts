import { MessageEmbed, IWrapper } from "discord.js";
import { BotClient } from "./BotClient";

export default class Wrapper implements IWrapper {
  id: string;
  client: BotClient | null;
  filepath?: string;
  handler?: any;
  constructor(id: string) {
    this.id = id;
    this.client = null;
  }
  NewEmbed() {
    return new MessageEmbed().setTimestamp();
  }
  Embed(data: Object): MessageEmbed {
    return new MessageEmbed(data);
  }
}
