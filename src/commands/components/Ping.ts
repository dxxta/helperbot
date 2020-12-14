import { Message } from 'discord.js'
import Command from '..'

export default class Ping extends Command {
  constructor() {
    super('ping', {
      alias: ['ping'],
      details: {
        desc: 'Check websocket connection between author - bot - api',
        usage: '<prefix | @bot_mention> ping',
        examples: ['!ping', '@bot ping'],
      },
      typing: true,
    })
  }
  async run(msg: Message): Promise<void> {
    const loading = await msg.channel.send('Checking...')
    try {
      //console.log(this.client?.ws.shards.reduce((a, b) => a + b.ping, 0))
      await msg.channel.send(`Result: \`${this.client?.ws.ping}ms\``)
    } finally {
      loading.delete()
    }
  }
}
