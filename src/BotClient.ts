import { Message } from 'discord.js'
import { Client, ClientOptions, UserResolvable, IClient } from 'discord.js'
import { config } from 'dotenv'
import { join } from 'path'
import CommandHandler from './commands/Handler'
import EventHandler from './events/Handler'
config()

export default class BotClient extends Client implements IClient {
  /**
   * @description data persist the bot
   */
  persist: Map<string, any>
  /**
   * @description basic bot config
   * @property {ownerID} - id of the bot owner
   * @property {token} - private bot token
   * @returns {Object} - of ownerId and token inside
   */
  config: { ownerID: string | string[]; token: string }
  commandHandler: CommandHandler = new CommandHandler(this, {
    dir: join(__dirname, 'commands/components'),
    prefix: '!',
    allowMentions: true,
    fetchMembers: true,
    cacheChannels: false,
    cachePresence: false,
    cacheUsers: false,
    ignorePerms: '565906486996500510',
  })
  eventHandler: EventHandler = new EventHandler(this, {
    dir: join(__dirname, 'events/components'),
  })
  constructor(
    config: { ownerID: string; token: string },
    options?: ClientOptions
  ) {
    super(options)
    this.persist = new Map()
    this.config = config
  }
  checkOwner(user: UserResolvable | string): boolean {
    const id = typeof user === 'string' ? user : this.users.resolveID(user)
    return Array.isArray(this.config.ownerID) && id
      ? this.config.ownerID.includes(id)
      : Boolean(id === this.config.ownerID)
  }
  async init(): Promise<any> {
    this.eventHandler.setEmitters({
      commandHandler: this.commandHandler,
      eventHandler: this.eventHandler,
    })
    await this.commandHandler.loadAll()
    await this.eventHandler.loadAll()
  }
  async ready(): Promise<void> {
    await this.init()
    await this.login(this.config.token)
  }
}

new BotClient(
  { ownerID: process.env.OWNER as string, token: process.env.TOKEN as string },
  { partials: ['MESSAGE', 'CHANNEL', 'REACTION'], messageCacheMaxSize: 50 }
).ready()
