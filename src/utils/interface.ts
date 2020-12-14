// import { Message } from "discord.js";
// import { PermissionString } from "discord.js";
// import { UserResolvable } from "discord.js";
import { ClientEvents } from 'discord.js'
import BotClient from '../BotClient'

declare module 'discord.js' {
  export type Tconfig = {
    ownerID: string | string[]
    token: string
  }
  export type ECommand = 'error' | 'conflict'

  export type Tchannel = 'both' | 'guild' | 'dm'

  export type StringFunction = (message: Message) => string | Promise<string>

  export type StringArrayFunction = (
    message: Message
  ) => string | string[] | Promise<string | string[]>

  export type Tignore =
    | string
    | string[]
    | PermissionString[]
    | StringArrayFunction

  export type Tdetail = {
    desc: string
    usage: string
    examples?: string[]
  }
  export interface IClient {
    persist: Map<string, any>
    config: Tconfig
    checkOwner(user: UserResolvable | string): boolean
    ready(): Promise<void>
  }
  export interface IWrapper {
    id: string
    filepath?: string
    client: BotClient | null
    handler?: any
  }

  export interface IBotHandler {
    extensions: Set<any>
    modules: Collection<string, any>
    load(filepath: any): Promise<any>
    loadAll(dir: string): Promise<any>
    preload(module: Function | any, filepath: any): any
  }

  export interface ICommandHandler {
    ignoreCooldown: Tignore | undefined
    blockBots: boolean | undefined
  }

  export interface ICommand extends ICommandHandler {
    alias: string[]
    details: Tdetail
    typing: boolean | undefined
    userPerms: Array<PermissionString> | undefined
    channel: Tchannel | undefined
    cooldown: number | undefined
    ownerOnly: boolean | undefined
    run(msg?: Message): void
  }

  export interface EventString extends ClientEvents {
    commandError: 'commandError'
  }
}
