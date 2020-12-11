import { UserResolvable } from "discord.js";
import { BotClient } from "../BotClient";

type config = {
  ownerID: string | string[];
  token: string;
};

declare module "discord.js" {
  export interface IClient {
    persist: Map<string, any>;
    config: config;
    checkOwner(user: UserResolvable | string): boolean;
    ready(): Promise<void>;
  }
  export interface IWrapper {
    id: string;
    filepath?: string;
    client: BotClient | null;
    handler?: any;
  }
}
